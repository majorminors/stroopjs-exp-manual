
		////////////
		/* set up */
		////////////

		var instructions_on = 1; // you can turn off (0) the first few blocks of instructions if you want to test

		var num_blocks = 2; // will repeat each block of stimuli this number of times (blocked together)
	
		var stim_width = { // stimulus width in pixels - height is auto (i.e. will maintain aspect ratio)
			small: 100,
			mid: 500,
			large: 1000
		} 

		var resp_options = [
			{
				resp_keys: ['a','s','d'],
				condition: ['asd',1],
			},
			{
				resp_keys: ['a','d','s'],
				condition: ['ads',2],
			},	
			{
				resp_keys: ['s','d','a'],
				condition: ['sda',3],
			},	
			{
				resp_keys: ['s','a','d'],
				condition: ['sad',4],
			},
			{
				resp_keys: ['d','a','s'],
				condition: ['das',5],
			},
			{
				resp_keys: ['d','s','a'],
				condition: ['dsa',6],
			}
		];
		console.log("resp opts: ",resp_options);

		var option_num = Math.floor(Math.random() * resp_options.length);
		var resp_keys = resp_options[option_num].resp_keys;
		var condition = resp_options[option_num].condition;
		console.log("option number: ",option_num);
		console.log("condition: ",condition)
		// we'll code red as resp_keys[0], blue as resp_keys[1], and green as resp_keys[2]

		jsPsych.data.addProperties({
			condition: condition
		});

		var timeline = []; // initialise timeline
		
		//////////////////
		/* instructions */
		//////////////////	

		var instructions = {
			type: 'html-keyboard-response',
			stimulus:'<p>In this experiment you will be asked to either report</p><br>'+
				'<p>the colour of a word, or the size of a word. In both cases,</p><br>'+
				'<p>you must ignore what the word says (i.e. try not to read the word).</p><br>'+
				'<br>Your response keys are:</p>'+
				'<p>red: '+JSON.stringify(resp_keys[0])+', blue: '+JSON.stringify(resp_keys[1])+', green: '+JSON.stringify(resp_keys[2])+
				"<br><br><p>press any key to continue</p>"
		}

		/* push those to the timeline, if instructions are on */
		if (instructions_on == 1) {
			timeline.push(instructions);
		}

		//////////////////
		/* trial blocks */
		//////////////////

		/* report colour instructions */
		var size_instructions = {
			type: 'html-keyboard-response',
			stimulus: '<p>report size</p>',
			choices: jsPsych.NO_KEYS,
			trial_duration: 500
		}

		/* report size instructions */
		var colour_instructions = {
			type: 'html-keyboard-response',
			stimulus: '<p>report colour</p>',
			choices: jsPsych.NO_KEYS,
			trial_duration: 500
		}

		/* stroop task */
		var stroop_task = {
			timeline: [
				{
					type: 'html-keyboard-response',
					stimulus: '<div style="font-size:60px;">+</div>',
					choices: jsPsych.NO_KEYS,
					trial_duration: 300
				},
				{
					type: 'image-keyboard-response',
					stimulus: jsPsych.timelineVariable('stim_path'),
					stimulus_width: jsPsych.timelineVariable('stim_size'),
					choices: resp_keys,
					on_finish: function(data){
						data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
					},
					data: jsPsych.timelineVariable('add_data')
				},
				{
					type: 'html-keyboard-response',
					choices: jsPsych.NO_KEYS,
					trial_duration: 300,
					stimulus: function(){
						var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
						if(last_trial_correct){
							return "<p>correct</p>";
						} else {
							return "<p>incorrect</p>";
						}
					}
				}
			],
			timeline_variables: [
				{stim_path: 'stimuli/red-red.svg', stim_size: stim_width.small, add_data: {stimulus: 'red-red-small', correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/red-red.svg', stim_size: stim_width.small, add_data: {stimulus: 'red-red-small', correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/red-blue.svg', stim_size: stim_width.small, add_data: {stimulus: 'red-blue-small', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/red-green.svg', stim_size: stim_width.small, add_data: {stimulus: 'red-green-small', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/blue-blue.svg', stim_size: stim_width.small, add_data: {stimulus: 'blue-blue-small', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/blue-blue.svg', stim_size: stim_width.small, add_data: {stimulus: 'blue-blue-small', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/blue-red.svg', stim_size: stim_width.small, add_data: {stimulus: 'blue-red-small', correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/blue-green.svg', stim_size: stim_width.small, add_data: {stimulus: 'blue-green-small', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/green-green.svg', stim_size: stim_width.small, add_data: {stimulus: 'green-green-small', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/green-green.svg', stim_size: stim_width.small, add_data: {stimulus: 'green-green-small', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/green-red.svg', stim_size: stim_width.small, add_data: {stimulus: 'green-red-small', correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/green-blue.svg', stim_size: stim_width.small, add_data: {stimulus: 'green-blue-small', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/red-red.svg', stim_size: stim_width.mid, add_data: {stimulus: 'red-red-mid', correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/red-red.svg', stim_size: stim_width.mid, add_data: {stimulus: 'red-red-mid', correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/red-blue.svg', stim_size: stim_width.mid, add_data: {stimulus: 'red-blue-mid', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/red-green.svg', stim_size: stim_width.mid, add_data: {stimulus: 'red-green-mid', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/blue-blue.svg', stim_size: stim_width.mid, add_data: {stimulus: 'blue-blue-mid', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/blue-blue.svg', stim_size: stim_width.mid, add_data: {stimulus: 'blue-blue-mid', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/blue-red.svg', stim_size: stim_width.mid, add_data: {stimulus: 'blue-red-mid', correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/blue-green.svg', stim_size: stim_width.mid, add_data: {stimulus: 'blue-green-mid', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/green-green.svg', stim_size: stim_width.mid, add_data: {stimulus: 'green-green-mid', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/green-green.svg', stim_size: stim_width.mid, add_data: {stimulus: 'green-green-mid', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/green-red.svg', stim_size: stim_width.mid, add_data: {stimulus: 'green-red-mid', correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/green-blue.svg', stim_size: stim_width.mid, add_data: {stimulus: 'green-blue-mid', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/red-red.svg', stim_size: stim_width.large, add_data: {stimulus: 'red-red-large', correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/red-red.svg', stim_size: stim_width.large, add_data: {stimulus: 'red-red-large', correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/red-blue.svg', stim_size: stim_width.large, add_data: {stimulus: 'red-blue-large', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/red-green.svg', stim_size: stim_width.large, add_data: {stimulus: 'red-green-large', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/blue-blue.svg', stim_size: stim_width.large, add_data: {stimulus: 'blue-blue-large', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/blue-blue.svg', stim_size: stim_width.large, add_data: {stimulus: 'blue-blue-large', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/blue-red.svg', stim_size: stim_width.large, add_data: {stimulus: 'blue-red-large', correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/blue-green.svg', stim_size: stim_width.large, add_data: {stimulus: 'blue-green-large', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/green-green.svg', stim_size: stim_width.large, add_data: {stimulus: 'green-green-large', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/green-green.svg', stim_size: stim_width.large, add_data: {stimulus: 'green-green-large', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/green-red.svg', stim_size: stim_width.large, add_data: {stimulus: 'green-red-large', correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/green-blue.svg', stim_size: stim_width.large, add_data: {stimulus: 'green-blue-large', correct_response: resp_keys[1]}}, 
			],
			randomize_order: true,
			repetitions: num_blocks
		}
		
		/* grab all the image paths, so we can preload them */
		var stroop_image_paths = []; // init the variable
		for (i = 0; i < stroop_task.timeline_variables.length; i++) {
			stroop_image_paths[i] = stroop_task.timeline_variables[i].stim_path;
		}

		/* false font task */
		var false_font_task = {
			timeline: [
				{
					type: 'html-keyboard-response',
					stimulus: '<div style="font-size:60px;">+</div>',
					choices: jsPsych.NO_KEYS,
					trial_duration: 300
				},
				{
					type: 'image-keyboard-response',
					stimulus: jsPsych.timelineVariable('stim_path'),
					stimulus_width: jsPsych.timelineVariable('stim_size'),
					choices: resp_keys,
					on_finish: function(data){
						data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
					},
					data: jsPsych.timelineVariable('add_data')
				},
				{
					type: 'html-keyboard-response',
					choices: jsPsych.NO_KEYS,
					trial_duration: 300,
					stimulus: function(){
						var last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
						if(last_trial_correct){
							return "<p>correct</p>";
						} else {
							return "<p>incorrect</p>"
						}
					}
				}
			],
			timeline_variables: [
				{stim_path: 'stimuli/ffred-red.svg', stim_size: stim_width.small, add_data: {stimulus: 'ffred-red-small',correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/ffred-red.svg', stim_size: stim_width.small, add_data: {stimulus: 'ffred-red-small',correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/ffred-blue.svg', stim_size: stim_width.small, add_data: {stimulus: 'ffred-blue-small', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/ffred-green.svg', stim_size: stim_width.small, add_data: {stimulus: 'ffred-green-small', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/ffblue-blue.svg', stim_size: stim_width.small, add_data: {stimulus: 'ffblue-blue-small', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/ffblue-blue.svg', stim_size: stim_width.small, add_data: {stimulus: 'ffblue-blue-small', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/ffblue-red.svg', stim_size: stim_width.small, add_data: {stimulus: 'ffblue-red-small',correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/ffblue-green.svg', stim_size: stim_width.small, add_data: {stimulus: 'ffblue-green-small', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/ffgreen-green.svg', stim_size: stim_width.small, add_data: {stimulus: 'ffgreen-green-small', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/ffgreen-green.svg', stim_size: stim_width.small, add_data: {stimulus: 'ffgreen-green-small', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/ffgreen-red.svg', stim_size: stim_width.small, add_data: {stimulus: 'ffgreen-red-small',correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/ffgreen-blue.svg', stim_size: stim_width.small, add_data: {stimulus: 'ffgreen-blue-small', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/ffred-red.svg', stim_size: stim_width.mid, add_data: {stimulus: 'ffred-red-mid',correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/ffred-red.svg', stim_size: stim_width.mid, add_data: {stimulus: 'ffred-red-mid',correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/ffred-blue.svg', stim_size: stim_width.mid, add_data: {stimulus: 'ffred-blue-mid', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/ffred-green.svg', stim_size: stim_width.mid, add_data: {stimulus: 'ffred-green-mid', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/ffblue-blue.svg', stim_size: stim_width.mid, add_data: {stimulus: 'ffblue-blue-mid', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/ffblue-blue.svg', stim_size: stim_width.mid, add_data: {stimulus: 'ffblue-blue-mid', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/ffblue-red.svg', stim_size: stim_width.mid, add_data: {stimulus: 'ffblue-red-mid',correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/ffblue-green.svg', stim_size: stim_width.mid, add_data: {stimulus: 'ffblue-green-mid', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/ffgreen-green.svg', stim_size: stim_width.mid, add_data: {stimulus: 'ffgreen-green-mid', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/ffgreen-green.svg', stim_size: stim_width.mid, add_data: {stimulus: 'ffgreen-green-mid', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/ffgreen-red.svg', stim_size: stim_width.mid, add_data: {stimulus: 'ffgreen-red-mid',correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/ffgreen-blue.svg', stim_size: stim_width.mid, add_data: {stimulus: 'ffgreen-blue-mid', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/ffred-red.svg', stim_size: stim_width.large, add_data: {stimulus: 'ffred-red-large',correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/ffred-red.svg', stim_size: stim_width.large, add_data: {stimulus: 'ffred-red-large',correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/ffred-blue.svg', stim_size: stim_width.large, add_data: {stimulus: 'ffred-blue-large', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/ffred-green.svg', stim_size: stim_width.large, add_data: {stimulus: 'ffred-green-large', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/ffblue-blue.svg', stim_size: stim_width.large, add_data: {stimulus: 'ffblue-blue-large', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/ffblue-blue.svg', stim_size: stim_width.large, add_data: {stimulus: 'ffblue-blue-large', correct_response: resp_keys[1]}},
				{stim_path: 'stimuli/ffblue-red.svg', stim_size: stim_width.large, add_data: {stimulus: 'ffblue-red-large',correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/ffblue-green.svg', stim_size: stim_width.large, add_data: {stimulus: 'ffblue-green-large', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/ffgreen-green.svg', stim_size: stim_width.large, add_data: {stimulus: 'ffgreen-green-large', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/ffgreen-green.svg', stim_size: stim_width.large, add_data: {stimulus: 'ffgreen-green-large', correct_response: resp_keys[2]}},
				{stim_path: 'stimuli/ffgreen-red.svg', stim_size: stim_width.large, add_data: {stimulus: 'ffgreen-red-large',correct_response: resp_keys[0]}},
				{stim_path: 'stimuli/ffgreen-blue.svg', stim_size: stim_width.large, add_data: {stimulus: 'ffgreen-blue-large', correct_response: resp_keys[1]}}, 
			],
			randomize_order: true,
			repetitions: num_blocks
		}

		/* grab all the image paths, so we can preload them */
		var falsefont_image_paths = []; // init the variable
		for (i = 0; i < false_font_task.timeline_variables.length; i++) {
			falsefont_image_paths[i] = false_font_task.timeline_variables[i].stim_path;
		}

		/* push tasks to timeline */
		
		var stroop_colour_proc = [colour_instructions,stroop_task]; // precede stroop with colour instructions
		var stroop_size_proc = [size_instructions,stroop_task]; // precede stroop with size instructions
		var falsefont_colour_proc = [colour_instructions,false_font_task]; // precede false fonts with colour instructions
		
		var unshuffled_procedure = [stroop_colour_proc, stroop_size_proc, falsefont_colour_proc]; // place all into a single array

		function shuffle(array) { // fisher-yates shuffler function
			var m = array.length, t, i;

			// While there remain elements to shuffle…
			while (m) {

				// Pick a remaining element…
				i = Math.floor(Math.random() * m--);

				// And swap it with the current element.
				t = array[m];
				array[m] = array[i];
				array[i] = t;
			}

			return array;
		}

		var shuffled_procedure = shuffle(unshuffled_procedure).flat(); // shuffle the procedure, and flatten it into one layer
		
		for (i = 0; i < shuffled_procedure.length; i++) { // loop through the shuffled and flattened procedure array, and push each jsPsych trial block to the timeline
			timeline.push(shuffled_procedure[i]);
		}

		/* individual blocks for testing */ 
		//timeline.push(size_instructions);
		//timeline.push(colour_instructions);
		//timeline.push(stroop_task);
		//timeline.push(false_font_task);
