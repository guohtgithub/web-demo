var getOverrides = function(theme){
    var themes = {
        "white": {
            //url: "day.css",
            up: "#03c087",
            down: "#ef5555",
            bg: "#ffffff",
            grid: "#f7f8fa",
            cross: "#23283D",
            border: "#9194a4",
            text: "#9194a4",
            areatop: "rgba(71, 78, 112, 0.1)",
            areadown: "rgba(71, 78, 112, 0.02)",
            line: "#737375"
        },
        "black": {
            //url: "night.css",
            up: "#589065",
            down: "#ae4e54",
            bg: "#181B2A",
            grid: "#1f2943",
            cross: "#9194A3",
            border: "#4e5b85",
            text: "#61688A",
            areatop: "rgba(122, 152, 247, .1)",
            areadown: "rgba(122, 152, 247, .02)",
            line: "#737375"
        },
        "mobile": {
            //url: "mobile.css",
            up: "#03C087",
            down: "#E76D42",
            bg: "#ffffff",
            grid: "#f7f8fa",
            cross: "#23283D",
            border: "#C5CFD5",
            text: "#8C9FAD",
            areatop: "rgba(71, 78, 112, 0.1)",
            areadown: "rgba(71, 78, 112, 0.02)",
            showLegend: !0
        }
    };
    var t = themes[theme];
    return {
        "volumePaneSize": "medium",
        "scalesProperties.lineColor": t.text,
        "scalesProperties.textColor": t.text,
        "paneProperties.background": t.bg,
        "paneProperties.vertGridProperties.color": t.grid,
        "paneProperties.horzGridProperties.color": t.grid,
        "paneProperties.crossHairProperties.color": t.cross,
        "paneProperties.legendProperties.showLegend": !!t.showLegend,
        "paneProperties.legendProperties.showStudyArguments": !0,
        "paneProperties.legendProperties.showStudyTitles": !0,
        "paneProperties.legendProperties.showStudyValues": !0,
        "paneProperties.legendProperties.showSeriesTitle": !0,
        "paneProperties.legendProperties.showSeriesOHLC": !0,
        "mainSeriesProperties.candleStyle.upColor": t.up,
        "mainSeriesProperties.candleStyle.downColor": t.down,
        "mainSeriesProperties.candleStyle.drawWick": !0,
        "mainSeriesProperties.candleStyle.drawBorder": !0,
        "mainSeriesProperties.candleStyle.borderColor": t.border,
        "mainSeriesProperties.candleStyle.borderUpColor": t.up,
        "mainSeriesProperties.candleStyle.borderDownColor": t.down,
        "mainSeriesProperties.candleStyle.wickUpColor": t.up,
        "mainSeriesProperties.candleStyle.wickDownColor": t.down,
        "mainSeriesProperties.candleStyle.barColorsOnPrevClose": !1,
        "mainSeriesProperties.hollowCandleStyle.upColor": t.up,
        "mainSeriesProperties.hollowCandleStyle.downColor": t.down,
        "mainSeriesProperties.hollowCandleStyle.drawWick": !0,
        "mainSeriesProperties.hollowCandleStyle.drawBorder": !0,
        "mainSeriesProperties.hollowCandleStyle.borderColor": t.border,
        "mainSeriesProperties.hollowCandleStyle.borderUpColor": t.up,
        "mainSeriesProperties.hollowCandleStyle.borderDownColor": t.down,
        "mainSeriesProperties.hollowCandleStyle.wickColor": t.line,
        "mainSeriesProperties.haStyle.upColor": t.up,
        "mainSeriesProperties.haStyle.downColor": t.down,
        "mainSeriesProperties.haStyle.drawWick": !0,
        "mainSeriesProperties.haStyle.drawBorder": !0,
        "mainSeriesProperties.haStyle.borderColor": t.border,
        "mainSeriesProperties.haStyle.borderUpColor": t.up,
        "mainSeriesProperties.haStyle.borderDownColor": t.down,
        "mainSeriesProperties.haStyle.wickColor": t.border,
        "mainSeriesProperties.haStyle.barColorsOnPrevClose": !1,
        "mainSeriesProperties.barStyle.upColor": t.up,
        "mainSeriesProperties.barStyle.downColor": t.down,
        "mainSeriesProperties.barStyle.barColorsOnPrevClose": !1,
        "mainSeriesProperties.barStyle.dontDrawOpen": !1,
        "mainSeriesProperties.lineStyle.color": t.border,
        "mainSeriesProperties.lineStyle.linewidth": 1,
        "mainSeriesProperties.lineStyle.priceSource": "close",
        "mainSeriesProperties.areaStyle.color1": t.areatop,
        "mainSeriesProperties.areaStyle.color2": t.areadown,
        "mainSeriesProperties.areaStyle.linecolor": t.border,
        "mainSeriesProperties.areaStyle.linewidth": 1,
        "mainSeriesProperties.areaStyle.priceSource": "close"
    }
}
function getStudiesOverrides(theme){
    var themes = {
        "white": {
            c0: "#eb4d5c",
            c1: "#53b987",
            t: 70,
            v: !1
        },
        "black": {
            c0: "#fd8b8b",
            c1: "#3cb595",
            t: 70,
            v: !1
        }
    };
    var t = themes[theme];
    return {
        "volume.volume.color.0": t.c0,
        "volume.volume.color.1": t.c1,
        "volume.volume.transparency": t.t,
        "volume.options.showStudyArguments": t.v
    }
}
 
页面js手动修改参数：
var skin = "white";
tvWidget.applyOverrides(getOverrides(skin));
tvWidget.applyStudiesOverrides(getStudiesOverrides(skin));
 
Tradingview初始化：
var skin = 'white';
var widget = window.tvWidget = new TradingView.widget({
        autosize: true,
        symbol: 'BTC',
        interval: '1D',
        container_id: "tv_chart_container",
        datafeed: new Datafeeds.UDFCompatibleDatafeed("/tradingview"),
        library_path: "/tradingview/charting_library/",
        timezone: 'Asia/Shanghai',
        locale: locale,
        custom_css_url: '/tradingview/css/'+skin+'.css',
        disabled_features: [
                "header_symbol_search",
                "header_saveload",
                "header_screenshot",
                "header_chart_type",
                "header_compare",
                "header_undo_redo",
                "timeframes_toolbar",
                "volume_force_overlay",
                "header_resolutions",
        ],
        //preset: "mobile",
        overrides: getOverrides(skin),
        studies_overrides: getStudiesOverrides(skin),
        charts_storage_url: 'https://saveload.tradingview.com',
        charts_storage_api_version: "1.1",
        client_id: 'tradingview.com',
        user_id: 'public_user_id'
});
                                            
参考线、按钮、时间切换：
var thats = widget;
var buttons = [
        {title:'Time',resolution:'1',chartType:3},
        {title:'1min',resolution:'1',chartType:1},
        {title:'5min',resolution:'5',chartType:1},
        {title:'15min',resolution:'15',chartType:1},
        {title:'30min',resolution:'30',chartType:1},
        {title:'1hour',resolution:'60',chartType:1},
        {title:'1day',resolution:'1D',chartType:1},
        {title:'1week',resolution:'1W',chartType:1},
        {title:'1month',resolution:'1M',chartType:1},
];
var studies = [];
 
function createButton(buttons){
        for(var i = 0; i < buttons.length; i++){
                (function(button){
                        thats.createButton()
            .attr('title', button.title).addClass("mydate")
            .text(button.title)
            .on('click', function(e) {
                if($(this).parent().hasClass('active')){
                        return false;
                }
                localStorage.setItem('tradingview.resolution',button.resolution);
                localStorage.setItem('tradingview.chartType',button.chartType);
                $(this).parent().addClass('active').siblings('.active').removeClass('active');
                thats.chart().setResolution(button.resolution, function onReadyCallback() {});
                if(button.chartType != thats.chart().chartType()){
                        thats.chart().setChartType(button.chartType);
                        toggleStudy(button.chartType);
                }
            }).parent().addClass('my-group'+(button.resolution==resolution && button.chartType == chartType ? ' active':''));
        })(buttons[i]);
        }
}
function createStudy(){
        var id = widget.chart().createStudy('Moving Average', false, false, [5], null, {'Plot.color': 'rgb(150, 95, 196)'});
        studies.push(id);
    id = widget.chart().createStudy('Moving Average', false, false, [10], null, {'Plot.color': 'rgb(116,149,187)'});
    studies.push(id);
    id = widget.chart().createStudy('Moving Average', false, false, [20],null,{"plot.color": "rgb(58,113,74)"});
    studies.push(id);
    id = widget.chart().createStudy('Moving Average', false, false, [30],null,{"plot.color": "rgb(118,32,99)"});
    studies.push(id);
}
function toggleStudy(chartType){
        var state = chartType == 3 ? 0 : 1;
        for(var i = 0; i < studies.length; i++){
                thats.chart().getStudyById(studies[i]).setVisible(state);
        }
}
widget.onChartReady(function(){
        //设置均线种类 均线样式
    createStudy();
    //生成时间按钮
    createButton(buttons);
        thats.chart().setChartType(chartType);
    toggleStudy(chartType);
});