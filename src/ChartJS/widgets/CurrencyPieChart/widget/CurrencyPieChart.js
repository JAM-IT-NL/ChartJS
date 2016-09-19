define([
    "dojo/_base/declare",
    "ChartJS/widgets/PieChart/widget/PieChart",
    "dojo/_base/lang",
    "dojo/query",
    "dojo/on",
    "dojo/html",
    "dojo/dom-style"
], function (declare, PieChart, lang, domQuery, on, html, domStyle) {
    "use strict";

    return declare("ChartJS.widgets.CurrencyPieChart.widget.CurrencyPieChart", [ PieChart ], {

        _createChart : function (data) {
            logger.debug(this.id + "._createChart");
            if (this._chart) {
                var set = this._createDataSets(data);
                this._chart.stop();
                this._chart.data.datasets = set.datasets;
                this._chart.data.labels = set.labels;
                this._chart.update(1000);
                this._chart.bindEvents(); // tooltips otherwise won't work
            } else {
                var chartProperties = {
                    type: this._chartType,
                    data:  this._createDataSets(data),
                    options: this._chartOptions({

                        //Boolean - Whether we should show a stroke on each segment
                        segmentShowStroke : this.segmentShowStroke,

                        //String - The colour of each segment stroke
                        segmentStrokeColor : this.segmentStrokeColor,

                        //Number - The width of each segment stroke
                        segmentStrokeWidth : this.segmentStrokeWidth,

                        //Number - Amount of animation steps
                        animationSteps : this.animationSteps,

                        //String - Animation easing effect
                        animationEasing : this.animationEasing,

                        //Boolean - Whether we animate the rotation of the Doughnut
                        animateRotate : this.animateRotate,

                        //Boolean - Whether we animate scaling the Doughnut from the centre
                        animateScale : this.animateScale,

                        legendCallback : this._legendAlternateCallback, 

                        //cutOut of pie
                        cutoutPercentage : 0, //always zero for Pie chart

                        showLabel: true, //Enables labels on the pie

                        tooltips : {
                            callbacks : {
                                label : function(tooltipItems, data) {
                                    var amount = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];

                                    var numberOptions = {};
                                    numberOptions.places = 0;
                                    numberOptions.locale = dojo.locale;
                                    numberOptions.groups = true;

                                    var formattedAmount = mx.parser.formatValue(amount, "currency", numberOptions);
                                    var label = "";
                                    if (data.labels[tooltipItems.index] != undefined) {
                                        label += data.labels[tooltipItems.index] +': ';
                                    }
                                    label += tooltipItems.yLabel + ' € ' + formattedAmount

                                    return label;
                                }
                            },
                        },
 
                    })
                };
                this._chart = new this._chartJS(this._ctx, chartProperties);

                // Chart.pluginService.register({
                //     afterDraw: function (chart, easing) {
                //         if (chart.config.options.showPercentage || chart.config.options.showLabel) {
                //             var self = chart.config;
                //             var ctx = chart.chart.ctx;

                //             ctx.font = '12px Arial';
                //             ctx.textAlign = "center";
                //             ctx.fillStyle = "#fff";
                            
                //             self.data.datasets.forEach(function (dataset, datasetIndex) {               
                //                 var total = 0, //total values to compute fraction
                //                     labelxy = [],
                //                     offset = Math.PI / 2, //start sector from top
                //                     radius,
                //                     centerx,
                //                     centery, 
                //                     lastend = 0; //prev arc's end line: starting with 0

                //                 for (var val of dataset.data) { total += val; } 
                                
                //                 //TODO needs improvement
                //                 var i = 0;
                //                 var meta = dataset._meta[i];
                //                 while(!meta) {
                //                     i++;
                //                     meta = dataset._meta[i];
                //                 }
                                
                //                 var element;
                //                 var index = 0;
                //                 for(index = 0; index < meta.data.length; index++) {
                                    
                //                     element = meta.data[index];
                //                     radius = 0.9 * element._view.outerRadius - element._view.innerRadius;
                //                     centerx = element._model.x;
                //                     centery = element._model.y;
                //                     var thispart = dataset.data[index],
                //                         arcsector = Math.PI * (2 * thispart / total);
                //                     if (element.hasValue() && dataset.data[index] > 0) {
                //                       labelxy.push(lastend + arcsector / 2 + Math.PI + offset);
                //                     }
                //                     else {
                //                       labelxy.push(-1);
                //                     }
                //                     lastend += arcsector;
                //                 }


                //                 var lradius = radius * 3 / 4;
                //                 for (var idx in labelxy) {
                //                     if (labelxy[idx] === -1) continue;
                //                     var langle = labelxy[idx],
                //                     dx = centerx + lradius * Math.cos(langle),
                //                     dy = centery + lradius * Math.sin(langle),
                //                     val = Math.round(dataset.data[idx] / total * 100);
                //                     if (chart.config.options.showPercentage)
                //                         ctx.fillText(val + '%', dx, dy);
                //                     else 
                //                         ctx.fillText(chart.config.data.labels[idx], dx, dy);
                //                 }
                //                 ctx.restore();
                //             });
                //         }
                //     }
                // });

                // Set the con
                html.set(this._numberNode, this._data.object.get(this.numberInside));

                // Add class to determain chart type
                this._addChartClass("chartjs-pie-chart");

                on(this._chart.chart.canvas, "click", lang.hitch(this, this._onClickChart));
            }
        }
    });
});

require(["ChartJS/widgets/CurrencyPieChart/widget/CurrencyPieChart"], function () {
    "use strict";
});
