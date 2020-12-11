function getPostSurvey(timeline){

    var reportForceQuit = {
        //if there are lots of responses with timeouts, they're too slow
        //if there are null responses, they're not doing the task

        type: 'html-button-response',
        stimulus: function(){

            data=jsPsych.data.getLastTrialData().readOnly().values();
            forceQuit=data[0]['forceQuit'];
            if(typeof forceQuit == "undefined"){//if we didn't record a forceQuit, it's 0
                forceQuit=0; 
            }

            if(forceQuit==2){ //too many errors during training
                txt = '<p>The experiment was ended because too many responses were inaccurate by more than 90 degrees. Please click through to tell us about any difficulties you had with the task.</p>';
            } 
            else if(forceQuit==1){//too many null responses
                txt = "<p>The experiment ended because there were too many trials on which we didn't receive any response. Please click through to tell us about any difficulties you had with the task.</p>";
            }
            else{
                txt = "";
            }
            return txt
        },
        trial_duration: function(){
            if(forceQuit==0){
                return 0 //move on straight away
            }
        },
        choices: ['->'],
        button_html: function(){
            if(forceQuit==0){
                but='<button class="jspsych-btn" disabled="disabled">%choice%</button>'; //disable the button in case the trial does briefly run
            }else{
                but='<button class="jspsych-btn">%choice%</button>';
            }
            return but
        },
    }; 
    timeline.push(reportForceQuit)

    var post_survey = {
        type: 'survey-text',
        questions: [
            {prompt: '<scan style="color: white">did you have any trouble paying attention or understanding the task?</scan>',rows: 2, columns: 10,name: 'personal'},
            {prompt: '<scan style="color: white">did you have any technical problems?</scan>',rows: 2, columns: 10,name: 'technical'}, //text-align: left; 
        ],
        button_label: ['->'],
        on_finish: function(){
            resultJson = jsPsych.data.get().json(); //get data
            console.log('submitting result data during post-survey');
            jatos.submitResultData(resultJson); //save, in case the exp on_finish doesn't run
        }
    }
    timeline.push(post_survey)

}