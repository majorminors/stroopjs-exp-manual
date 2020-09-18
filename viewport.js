
var screen_dimensions = { //get screen and viewport dimensions
    type: 'call-function',
    func: function(){
        var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],viewx=w.innerWidth||e.clientWidth||g.clientWidth,viewy=w.innerHeight||e.clientHeight||g.clientHeight;
        var dpcm=calcScreenDPCM()
        var width_cm = viewx/dpcm;
        var height_cm = viewy/dpcm;
        jsPsych.data.getLastTrialData().addToAll({ //add screen and viewport info to the resize trial data. that way, all sz info is together
            screen_width_px: screen.width,
            screen_height_px: screen.height, 
            viewport_width_px: viewx,
            viewport_height_px: viewy,
            px_per_cm: dpcm,
            viewport_width_cm: width_cm,
            viewport_height_cm: height_cm,
        })
    },
}
timeline.push(screen_dimensions)