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
], function (declare, BarChart, domClass, domAttr, lang, on, _jquery, _bootstrap) {
    "use strict";

    return declare("ChartJS.widgets.AffixBarChart.widget.AffixBarChart", [ BarChart ], {

        _addChartClass: function (className) {
            logger.debug(this.id + "._addChartClass");
            domClass.remove(this.domNode, className);
            domClass.add(this.domNode, className);

            domAttr.set(this.domNode, "data-spy", "affix");
            domAttr.set(this.domNode, "data-offset-top", "10");
            domAttr.set(this.domNode, "data-offset-bottom", "10");
        }

    })
    
});

require(["ChartJS/widgets/AffixBarChart/widget/AffixBarChart"], function () {
    "use strict";
});
