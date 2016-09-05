define([
    "dojo/_base/declare",
    "ChartJS/widgets/BarChart/widget/BarChart",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/_base/lang",
    "dojo/on",
    // External libraries
    "ChartJS/lib/jquery-3.1.0.min",
    "ChartJS/lib/bootstrap.min"
], function(declare, BarChart, domClass, domAttr, lang, on, _jquery, _bootstrap) {
    "use strict";

    return declare("ChartJS.widgets.CurrencyBarChart.widget.CurrencyBarChart", [BarChart], {

        _createChart: function(data) {
            logger.debug(this.id + "._createChart");

            if (this._chart) {
                this._chart.stop();
                this._chart.data.datasets = data.datasets;
                this._chart.data.labels = data.labels;
                this._chart.update(1000);
                this._chart.bindEvents(); // tooltips otherwise won't work
            } else {
                var chartProperties = {
                    type: this._chartType,
                    data: data,
                    options: this._chartOptions({

                        scales: {
                            xAxes: [{
                                display: this.scaleShow,
                                scaleLabel: {
                                    display: (this.xLabel !== "") ? true : false,
                                    labelString: (this.xLabel !== "") ? this.xLabel : "",
                                    fontFamily: this._font
                                },
                                ticks: {
                                    fontFamily: this._font,
                                },
                                gridLines: {
                                    display: this.scaleShowVerticalLines,
                                    color: this.scaleGridLineColor,
                                    lineWidth: this.scaleLineWidth
                                },
                            }],
                            yAxes: [{
                                display: this.scaleShow,
                                scaleLabel: {
                                    display: (this.yLabel !== "") ? true : false,
                                    labelString: (this.yLabel !== "") ? this.yLabel : "",
                                    fontFamily: this._font
                                },
                                ticks: {
                                    fontFamily: this._font,
                                    beginAtZero: this.scaleBeginAtZero,
                                    display: this.scaleShowLabels,
                                    userCallback: lang.hitch(this, function(value, index, values) {
                                        return "€ " + this._formatValue(value);
                                    })
                                },
                                gridLines: {
                                    display: this.scaleShowHorizontalLines,
                                    color: this.scaleGridLineColor,
                                    lineWidth: this.scaleLineWidth
                                },
                            }]
                        },

                        //Boolean - If there is a stroke on each bar
                        barShowStroke: this.barShowStroke,

                        //Number - Pixel width of the bar stroke
                        barStrokeWidth: this.barStrokeWidth,

                        //Number - Spacing between each of the X value sets
                        barValueSpacing: this.barValueSpacing,

                        //Number - Spacing between data sets within X values
                        barDatasetSpacing: this.barDatasetSpacing,

                        legendCallback: this._legendCallback,

                        //The scale line width
                        scaleLineWidth: this.scaleLineWidth,

                        //The scale line color
                        scaleLineColor: this.scaleLineColor,

                        tooltips: {
                            callbacks: {
                                label: lang.hitch(this, function(tooltipItems, data) {
                                    var amount = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];

                                    var formattedAmount = this._formatValue(amount);
                                    var label = "";
                                    label += data.datasets[tooltipItems.datasetIndex].label + ':  € ' + formattedAmount;
                                    
                                    return label; 
                                })
                            },
                        },
                    })
                };

                if (this.scaleBeginAtZero) {
                    chartProperties.options.scales.yAxes[0].ticks.suggestedMin = 0;
                    chartProperties.options.scales.yAxes[0].ticks.suggestedMax = 4;
                }

                this._chart = new this._chartJS(this._ctx, chartProperties);

                this.connect(window, "resize", lang.hitch(this, function() {
                    this._resize();
                }));

                // Add class to determain chart type
                this._addChartClass("chartjs-bar-chart");

                on(this._chart.chart.canvas, "click", lang.hitch(this, this._onClickChart));
            }
        },

        _formatValue: function(value) {
            var numberOptions = {};
            numberOptions.places = 0;
            numberOptions.locale = dojo.locale;
            numberOptions.groups = true;

            return mx.parser.formatValue(value, "currency", numberOptions);
        }

    })

});

require(["ChartJS/widgets/CurrencyBarChart/widget/CurrencyBarChart"], function() {
    "use strict";
});