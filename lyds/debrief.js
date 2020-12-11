function getDebrief(timeline){

    //give info about the experiment
    var debrief = {
        type: 'instructions',
        on_load: function(){
            document.body.style.backgroundColor="#00AAFF";
        },
        pages: ["<p><strong>What was this experiment about?</strong></p>\
        <p>We are interested in how we are able to remember and focus on things that are useful for our current task. You may not notice this extraordinary ability until you begin to make mistakes—when you tackle a difficult problem, or when you are tired—but you use it every day. In our research, we are trying to understand how our goals influence our focus, and how this happens in brain.</p>\
        <p>This experiment explores how we distribute our focus over things that are relevant right now, and things that may be relevant later. We can think about many of the things we do as a collection of parts. For example, we make a meal by collecting the ingredients, cutting, mixing, stirring, and cooking. As we stir, we need to remember what we are making, what we have put in so far, and what will go in next.</p>\
        <p>You may have noticed that sometimes, as you attended to “orange, then blue”, some blue dots appeared with the orange dots. You did not have to respond to these dots, but if they caught your attention, your answer may have swayed towards them. We are using these dots, in the colour that was about to be relevant, to ask how we prepare our focus for things that we are about to do. Do we focus closely on what we are doing right now? Or, do we remain watchful for things that may be relevant to us soon?</p>\
        <p>We hope that learning about our instinctive choices—to focus deeply on what we are doing, or remain aware of what might be useful to us later—will help us understand ourselves and appreciate our wonderfully adaptive brains.</p>\
        "], 

        show_clickable_nav: true,
        button_label_next: ['Submit!  -'],
        //button_label_previous: ['-'],
        /*on_finish: function(){ //go to Prolific
            if(forceQuit==0){ //if they actually finished the whole experiment, give them the completion code
                window.location.href="https://app.prolific.co/submissions/complete?cc=8B7B9EA0";
            }
        },*/
    };
    timeline.push(debrief);
}