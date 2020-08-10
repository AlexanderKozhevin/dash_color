var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');
const consola = require('consola')
var fs = require('fs');
const readLastLines = require('read-last-lines');

const _ = require('lodash')
const tus = require('tus-node-server');
const EVENTS = require('tus-node-server').EVENTS;

const uploadApp = express();

const metadataStringToObject = (stringValue) => {
  const keyValuePairList = stringValue.split(',');

  return _.reduce(keyValuePairList , (metadata, keyValuePair) => {
    let [key, base64Value] = keyValuePair.split(' ');
    metadata[key] = new Buffer(base64Value, "base64").toString("ascii");

    return metadata;
  }, {});
};

var db = require('./db');
var md5 = require('md5');


router.use(bodyParser.json({
	limit: '20mb'
}));
router.use(bodyParser.urlencoded({
	  extended: true
}));

const server = new tus.Server();

const myURL = (req) => {
    return req.query.name;
}

server.datastore = new tus.FileStore({
    path: '/video_data/source',
    namingFunction: myURL
});

uploadApp.all('*', server.handle.bind(server));

server.on(EVENTS.EVENT_UPLOAD_COMPLETE, (event) => {
    console.log(`Upload complete for file`);
		console.log(event.file);


    let metadata = metadataStringToObject(event.file.upload_metadata)

    let video = {
      status: "wait",
      name: event.file.id,
      filename: metadata.filename,
      original: "http://localhost:3000/video_source/" + event.file.id
    }
    fs.copyFile('/home/cfa/dash_color/video_data/source/' + event.file.id, '/home/cfa/colorize_enterprise/colorize_enterprise/video/source/' + event.file.id, (err) => {
      console.log(' - FILE - --');
      console.log(err);
      db.get().collection('videos').insertOne(video).then(()=>{
        console.log('created video task');
      })
      // fs.unlink('/home/cfa/dash_color/video_data/source/' + event.file.id, (err) => {
      //   if (err) {
      //     console.log('error deleting file :()');
      //     console.error(err)
      //     return
      //   }
      //
      //   //file removed
      // })
    });

    // console.log(event.file.upload_metadata);

		// let metadata = metadataStringToObject(event.file.upload_metadata)
		// console.log('got metadata');


    // db.get().collection('users').findOne({email: metadata.user}, (err, resulter)=>{
    //
		// helper.createJob({
    //    name: event.file.id,
    //    img_source: metadata.path,
    //    status: 'queue',
    //    uploaded: false,
    //    paid: resulter.paid,
    //    user : metadata.user,
		// 	 email : metadata.user,
    //    api: false
    //  })
    //  console.log('job creator');
    //  helper.increment_counter2(metadata.user)
    //
		// setTimeout(()=>{
    //   storage.bucket("colorize_jobs").upload('./files/'+event.file.id, {destination : metadata.path + '/' + event.file.id}, function(err){
    //     console.log(err);
   	// 		console.log('uploaded the thing :3');
    //     fs.unlink('./files/'+event.file.id, function (err) {
    //         if (err) throw err;
    //         // if no error, file has been deleted successfully
    //         console.log('File deleted!');
    //
    //         helper.updateJob({
    //           name: event.file.id,
    //         })
    //
    //     });
   	// 	});
    // }, 1000)
    //
    // })

});


router.use('/uploads',  uploadApp);

router.post('/job_start', function(req, res){

  db.get().collection('videos').updateOne({
        name: req.body.name
      }, {$set: {
        "status": "work"
      }}).then(()=>{
        res.status(200).send('ok')
      })
})


router.get('/log', function(req, res){

  // readLastLines.read('./server/mylogs.log', 2)
  //     .then((lines) => {
  //       res.send(lines)
  //     });


  fs.readFile('/home/cfa/colorize_enterprise/colorize_enterprise/mylogs.log', 'utf8', function(err, data) {
    if (err) throw err;
    // console.log(data);
    // console.log(typeof(data));
    let index1 = data.lastIndexOf('[')
    let index2 = data.lastIndexOf(']')
    if ((index1 != -1) && (index2 != -1)){
      res.send(data.substr(index1, index2 - index1))
    } else {
      res.send('')
    }

  });

})

router.post('/job_done', function(req, res){

  db.get().collection('videos').updateOne({
        name: req.body.name
      }, {$set: {
        "status": "done",
        "link": "http://localhost:3000/video_result/" + req.body.name
      }}).then(()=>{
        res.status(200).send('ok')
      })
})

router.get('/tasks', function(req, res){
  db.get().collection('videos').find({status: "wait"}).sort({_id:1}).limit(1).toArray((error, photos)=>{
    res.send(photos)
  })
})


router.get('/', function(req, res){

  let page = req.body.page || 1

  db.get().collection('videos').count({}).then((max)=>{

    let mymax = Math.ceil(max / 100);
    if (mymax < 1){
      mymax = 1
    }
    db.get().collection('videos').find({}).sort({_id:-1}).limit(100).skip((page-1)*100).toArray((error, photos)=>{
      res.status(200).json({max: mymax, photos: photos})
    })
  })

})

module.exports = router
