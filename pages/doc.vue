<template>
  <div class="desktop-root flex-row flex-main-center">

      <div class="root-content">
        <main-menu active="doc"></main-menu>
        <div class="my-contentent flex-col flex-main-start">
          <div class="docs_list flex-row flex-second-center">Documentation</div>

          <div class="stage flex-rol flex-main-start flex-second-start">
            <div class="stage_heading">1. Processing folder of photos with python script</div>
            <vue-code-highlight>
               cd colorize_enterprise/colorize_enterprise
               conda activate soft
               python worker.py
            </vue-code-highlight>
            <br>
            <div class="explanation">source photos <b>colorize_enterprise/colorize_enterprise/source</b></div>
            <div class="explanation">source photos <b>colorize_enterprise/colorize_enterprise/result_images</b></div>
          </div>


          <div class="stage flex-rol flex-main-start flex-second-start">
            <div class="stage_heading">2. Processing folder of photos with bash script</div>
            <vue-code-highlight>
               cd colorize_enterprise/colorize_enterprise
               ./folder.sh
            </vue-code-highlight>
            <br>
            <div class="explanation">source photos <b>colorize_enterprise/colorize_enterprise/source</b></div>
            <div class="explanation">source photos <b>colorize_enterprise/colorize_enterprise/result_images</b></div>
          </div>


          <div class="stage flex-rol flex-main-start flex-second-start">
            <div class="stage_heading">3. Processing video with python script</div>
            <vue-code-highlight>
              cd colorize_enterprise/colorize_enterprise
              conda activate soft
              python video.py
            </vue-code-highlight>
            <br>
            <div class="explanation">source video <b>colorize_enterprise/colorize_enterprise/video/video.mp4</b></div>
            <div class="explanation" style="color: red;">Important source file should be named video.mp4!</b></div>
            <div class="explanation">source photos <b>colorize_enterprise/colorize_enterprise/result_images</b></div>
          </div>


          <div class="stage flex-rol flex-main-start flex-second-start">
            <div class="stage_heading">4. Processing video with bash script</div>
            <vue-code-highlight>
              cd colorize_enterprise/colorize_enterprise
              ./video.sh
            </vue-code-highlight>
            <br>
            <div class="explanation">source video <b>colorize_enterprise/colorize_enterprise/video/video.mp4</b></div>
            <div class="explanation" style="color: red;">Important source file should be named video.mp4!</b></div>
            <div class="explanation">source photos <b>colorize_enterprise/colorize_enterprise/result_images</b></div>
          </div>

          <div class="stage flex-rol flex-main-start flex-second-start">
            <div class="stage_heading">5. Dashboard</div>
            <br/>
            <div class="explanation">
              Read carefully! Dashboard consists of many small parts
              <br>
              <br>
              <ul>
                <li>Database</li>
                <li>User interface </li>
                <li>video worker daemon </li>
                <li>photo worker daemon </li>
              </ul>

            </div>

          </div>

          <div class="stage flex-rol flex-main-start flex-second-start">
            <div class="stage_heading">5.1 Dashboard:Database</div>
            <br/>
            <div class="explanation">
              Dashboard is using local <b>mongodb</b>
              Make sure it's working.
              <vue-code-highlight>
                sudo service mongod status
              </vue-code-highlight>
              <div class="explanation">
                If it's off  - run command
              </div>
              <vue-code-highlight>
                sudo service mongod start
              </vue-code-highlight>


            </div>

          </div>


          <div class="stage flex-rol flex-main-start flex-second-start">
            <div class="stage_heading">5.2 Dashboard: User interface</div>
            <br/>
            <div class="explanation">
              Dashboard is written on NuxtJS framework. It always located at <b>localhost:3000</b>

              To make it running, make
            </div>

            <vue-code-highlight>
              cd ~/dash_color/
              npm run build
              pm2 start npm --name "colorizer" -- #start //it starts daemon mode
            </vue-code-highlight>

            <div class="explanation">
              To check if IU is running
            </div>
            <vue-code-highlight>
              cd ~/dash_color/
              pm2 list # You will see service "colorize" - green or red
            </vue-code-highlight>

            <div class="explanation">
              Run UI in dev mode
            </div>
            <vue-code-highlight>
              cd ~/dash_color/
              npm run dev
            </vue-code-highlight>

          </div>

          <div class="stage flex-rol flex-main-start flex-second-start">
            <div class="stage_heading">5.3 Dashboard: Video worker daemon</div>
            <br/>
            <div class="explanation">
              Video processing worker - is a simple python script which checks database every 5 seconds
              and process video when it found a new one <b>video_worker.py</b>.


              To run it manually just use
            </div>

            <vue-code-highlight>
              cd ~/colorize_enterprise/colorize_enterprise
              ./video_worker.sh
            </vue-code-highlight>
            <div class="explanation">
              To run it as a daemon - make sure you set up cront tab tasks.
              This configuration run bash script every minute.
              And check if it's running. If no - start again.
            </div>
            <vue-code-highlight>
              crontab -e
              #and paste there
              # * * * * * /home/cfa/colorize_enterprise/colorize_enterprise/video_worker.sh
            </vue-code-highlight>



          </div>


          <div class="stage flex-rol flex-main-start flex-second-start">
            <div class="stage_heading">5.4 Dashboard: Photo worker daemon</div>
            <br/>
            <div class="explanation">
              Photo processing worker - is a simple python script which checks database every 1 seconds
              and process video when it found a new one <b>photo_dash.py</b>.


              To run it manually just use
            </div>

            <vue-code-highlight>
              cd ~/colorize_enterprise/colorize_enterprise
              ./runner.sh
            </vue-code-highlight>
            <div class="explanation">
              To run it as a daemon - make sure you set up cront tab tasks.
              This configuration run bash script every minute.
              And check if it's running. If no - start again.
            </div>
            <vue-code-highlight>
              crontab -e
              #and paste there
              # * * * * * /home/cfa/colorize_enterprise/colorize_enterprise/runner.sh
            </vue-code-highlight>



          </div>

          <div class="stage flex-rol flex-main-start flex-second-start">
            <div class="stage_heading">6 DPX images</div>
            <br/>
            <div class="explanation">
              You can run a script which convert a folder of DPX images to JPG folder of images

              With bash script
            </div>

            <vue-code-highlight>
              cd ~/colorize_enterprise/colorize_enterprise
              ./dpx.sh
            </vue-code-highlight>
            <div class="explanation">
              Source images are at ~/dpx_images <br>
              Result images are at ~/dpx_images_done
            </div>




          </div>




        </div>
      </div>

  </div>
</template>

<script>
import mainMenu from '@/components/menu.vue';
import upload from '@/components/video/upload.vue';
import videos from '@/components/video/videos.vue';
import { component as VueCodeHighlight } from 'vue-code-highlight';

export default {
  components: {
    'main-menu': mainMenu,
    'upload': upload,
    videos,
    VueCodeHighlight
  },
  created(){

  }
}
</script>

<style lang="scss">
.docs_list{
  border-bottom: 1px solid hsla(0,0%,51%,.2);
  min-height: 64px;
  padding-left: 30px;
}
.stage{
  // width: calc();
  margin-top: 30px;
  // height: 400px;
  padding-bottom: 30px;
  // border: 5px solid red;
  border: 1px solid #f3a683;
  border-radius: 5px;
  box-sizing: border-box;
  margin-left: 30px;
  margin-right: 30px;
}
.stage_heading{
  color: #303952;
  margin-left: 20px;
  margin-top: 20px;
  padding-bottom: 20px;
  font-size: 16px;
  border-bottom: 1px solid rgba(#f3a683, 0.5);
}
.code_section{
  margin-left: 20px;
}
.explanation{
  margin-left: 20px;
  margin-bottom: 5px;
  margin-top: 5px;
  max-width: 600px;
}
.my-contentent{
  overflow: auto;
  padding-bottom: 150px;
}
</style>
