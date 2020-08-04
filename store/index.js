export const strict = false
import md5 from 'md5';
import axios from "axios";

let server = axios.create({
  baseURL: 'http://localhost:3000/api/photos'
});

export const state = () => ({
  locales: ['en'],
  locale: 'en',
  uploads: [],
  page: 1,
  max_page: 1,
  photos: []
})

export const mutations = {
  shift_page(state, value){
    state.page = value
  },
  get_list(state){
    // state.photos = []
    server.get('/?page=' + state.page).then((data)=>{
      console.log('list');
      console.log(data);
      state.photos = data.data.photos;
      state.max_page = data.data.max;
    })
  },
  uploadFile(state, file){


  let date = new Date()


  let hash = md5(date + file.name);
  // let hash = file.name;

  let extension = file.name.split('.').pop();
  let finalExt = ''
  if (extension){
    finalExt = extension.toLowerCase()
  }
  // let final_name = hash + '.' + finalExt
  let final_name = hash + '.'  + finalExt

  let baseurl ='http://localhost:3000/'
  let UPLOAD_URL = baseurl + `api/photos/uploads?name=${final_name}`

  let listt  = Object.assign([], state.uploads);
  listt.push(final_name)
  state.uploads = listt

  window['tus'].canStoreURLs = false;

  let upload = new window['tus'].Upload(file, {
    endpoint: UPLOAD_URL,
    retryDelays: [0, 1000, 3000, 5000],
    canStoreURLs: false,
    // uploadUrl: baseurl,
    chunkSize: 1000000,
    removeFingerprintOnSuccess: true,
    metadata: {
      filename : file.name
    },
    onError: function(error) {
      console.log('error')
      // console.log(error);
      document.querySelector('#file_input').value = ''
      // vm.$store.commit('upload_done');
      let listt  = Object.assign([], state.uploads);

      let listt2 = []

      listt.forEach((el)=>{
        if (el != final_name){
          listt2.push(el)
        }
      })
      state.uploads = listt2
    },
    onProgress: function(bytesUploaded, bytesTotal) {
      let progress = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
      console.log(progress);
      // vm.$store.commit('set_progress', progress);
    },
    onSuccess: function(data) {
      console.log(data);
      console.log('success');
      document.querySelector('#file_input').value = '';
      let listt  = Object.assign([], state.uploads);

      let listt2 = []

      listt.forEach((el)=>{
        if (el != final_name){
          listt2.push(el)
        }
      })
      state.uploads = listt2
      // vm.$store.commit('upload_done');
    }
  });
  upload.start();

  }
}
