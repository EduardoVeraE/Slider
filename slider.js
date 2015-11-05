define(["qlik","./properties","./initialProperties"], function(qlik, props, initProps) {
	return {
		//initialProperties : initProps,
		initialProperties : {
			version : 1.0,
			variableValue : {},
			variableName : ""
		},
		definition : {
			type : "items",
			component : "accordion",
			items : {
				settings : {
					uses : "settings",
					items : { // Propiedades
						variable : {
							type : "items",
							label : "Parámetros",
							items : {
								name : {
									ref : "variableName",
									label : "Nombre de variable a usar",
									type : "string",
									change : function(data) {
										//create variable - ignore errors
										qlik.currApp().variable.create(data.variableName);
										data.variableValue.qStringExpression = '=' + data.variableName;
									}
								},

								limitInf : {
							        ref: "props.limitInf",
							        label: "Valor Mínimo",
							        type: "number",
							        expression: "optional",
							        defaultValue: -10
							    },
							    limitSup : {
							        ref: "props.limitSup",
							        label: "Valor Máximo",
							        type: "number",
							        expression: "optional",
							        defaultValue: 10
							    },
							    sliderStep : {
							        ref: "props.sliderStep",
							        label: "Incremento Estático",
							        type: "number",
							        expression: "optional",
							        defaultValue: 0.5
							    }
							}
						}
					}
				}
			}
		},
		paint : function($element, layout) {
			var html = "", ext = this;

			html += '<input type="range" min="' + layout.props.limitInf + '" max="' + layout.props.limitSup + '" step="' + layout.props.sliderStep + '" style="width:98%" value="' + layout.variableValue + '"/>';
			$element.html(html);
			$element.find('input').on('change', function() {
				var val = $(this).val() + '';
				qlik.currApp(ext).variable.setContent(layout.variableName, val);
			})
		}
	};

});
