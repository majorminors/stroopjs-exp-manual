<!--lydia barnes, july 2020-->
<!--lydiabarnes01@gmail.com-->

<!--wrapper function for dot motion task-->
<!--separate functions show info-consent, check screen, check demographics, show instructions, 
    run training & core task, check for issues, and debrief-->


<!DOCTYPE html>
<html>

<head>
    <title>Moving dots</title>

    <!--specify your text document encoding within the first 1024 bytes of the file, or firefox will complain-->
    <meta http-equiv="Content-Type" content="text/html"; charset="utf-8">

    <script src="jatos.js"></script>

    <script src="jsPsych-6.1.0/jspsych.js"></script>
    <script src="jsPsych-6.1.0/plugins/jspsych-rdk.js"></script>
    <script src="jsPsych-6.1.0/plugins/jspsych-html-keyboard-response.js"></script>
    <script src="jsPsych-6.1.0/plugins/jspsych-html-button-response.js"></script>
    <script src="jsPsych-6.1.0/plugins/jspsych-image-button-response.js"></script>
    <script src="jsPsych-6.1.0/plugins/jspsych-instructions.js"></script>
    <script src="jsPsych-6.1.0/plugins/jspsych-survey-text.js"></script>
    <script src="jsPsych-6.1.0/plugins/jspsych-survey-multi-choice.js"></script>
    <script src="jsPsych-6.1.0/plugins/jspsych-resize.js"></script>
    <script src="jsPsych-6.1.0/plugins/jspsych-call-function.js"></script>

    <script src="library/jquery-3.5.1.js"></script>
    <script src="jQuery-Knob-master/js/jquery.knob.js"></script> 
    <script src="library/jspsych-dial-response.js"></script>

    <script src="library/getDPI.js"></script>
    <script src="library/estimate_frame_rate.js"></script>
    <script src="library/wait.js"></script>
    <script src="library/getRandomInt.js"></script>
    <script src="library/warning.js"></script>
    <script src="library/setBatch.js"></script>
    <script src="library/getNextCondition.js"></script>
    <script src="library/getMod.js"></script>
    <script src="library/getMedian.js"></script>

    <link rel="stylesheet" href="library/jspsych_rdk.css"></link>

    <script src = "trialLists/trialList_demo.js"></script>    <!--demo trial lists-->
    <script> var trialList_demo = trialList; </script>
    <script src = "trialLists/trialList_main.js"></script>    <!--core trial lists-->

    <script src="library/infoConsent.js"></script>
    <script src="library/prepScreen.js"></script>
    <script src="library/preSurvey.js"></script>
    <script src="library/instructions.js"></script>
    <script src ="library/exp.js"></script>
    <script src ="library/postSurvey.js"></script>
    <script src ="library/debrief.js"></script>

</head>

<body><p id="user"></p></body>

<script>

    jatos.onLoad(function(){

        var debug = 0; //reduces block length to test block transitions / get dataset quickly

        var condition = getNextCondition();
        var timeline = []     //prep timeline
        var stim_sz = 700;    //assuming that ppl are 50 cm away, stim at 14cm^2 is close to Python versions.
        //var forceQuit = 0;

        getInfoConsent(timeline);   //show study description, get consent
        getPrepScreen(timeline,condition);  //check refresh rate, screen dimensions
        getPreSurvey(timeline); //get demographics, confirm normal colour vision
        getInstructions(timeline,stim_sz);  //show task instructions

        //training
        var demo = 1;
        thisTrialList = trialList_demo[condition];
        thisTrialList = thisTrialList.slice(0,2); //reduce to blocks 0:2, inc. 0, excl. 2, ie the first two blocks
        getExp(timeline,thisTrialList,demo,debug,stim_sz); 

        //core
        var demo = 0;
        thisTrialList = trialList[condition];
        getExp(timeline,thisTrialList,demo,debug,stim_sz);

        getPostSurvey(timeline);    //check whether they had any trouble with the task
        getDebrief(timeline);   //explain what the study was about, return to Prolific

        jsPsych.init({
            timeline: timeline,
            message_progress_bar: 'progress',
            exclusions: {                                                       
                min_width: 500, //px                                            
                min_height: 500,
            },
            on_finish: function () { //when the experiment finishes
                var time = jsPsych.totalTime();
                jsPsych.data.addProperties({
                    expt_duration: time,
                });

                var resultJson = jsPsych.data.get().json(); 

                //check forceQuit
                data=jsPsych.data.getLastTrialData().readOnly().values();
                forceQuit=data[0]['forceQuit']
                if(typeof forceQuit == "undefined"){
                    forceQuit=0
                }
                
                function afterSave(){
                    if(forceQuit!=0){ //if we made them quit, just save the data
                        console.log('ending study, forceQuit clause')
                        jatos.endStudyAjax(true,"study complete!") //save data to server
                        .then(() => {
                            window.location.href = 'https://app.prolific.co'
                        })
                    }else{ //if they really finished, give them the Prolific completion code
                        //https://www.jatos.org/jatos.js-Reference.html#jatosendstudy
                        console.log('ending study, no forceQuit')
                        jatos.endStudyAjax(true,"study complete! returning to Prolific")
                        .then(() => {
                            window.location.href = 'https://app.prolific.co/submissions/complete?cc=8B7B9EA0'
                        });
                    }
                }

                console.log('submitting result data during experiment on_finish');
                jatos.submitResultData(resultJson,afterSave) //send the results through, then end the study once the data are successfully saved


            },
            on_close: function(){ //make sure the data also save if people close their browser
                var time = jsPsych.totalTime();
                jsPsych.data.addProperties({
                    expt_duration: time,
                });

                var resultJson = jsPsych.data.get().json(); 
                console.log('submitting result data during experiment on_close');
                jatos.submitResultData(resultJson, jatos.endStudy); //don't give the completion code to people who quit early
            
            },
        })

    });
</script>

</html>