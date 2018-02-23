       //Grid Stack Code
        $(document).ready(
            function () {
                var options = {
                    removable: '.trash',
                };
                $('.grid-stack').gridstack(options);

                new function () {
                    this.serializedData = [
                        { name: 'Panel-Con1', x: 0, y: 0, width: 6, height: 4, PanLogo: 'glyphicon glyphicon-credit-card', PanBck: 'Green', PanTitle: 'Panel-Con1', PanOpts: '<button type="button" id="expand1" class="menu_btn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="glyphicon glyphicon-resize-full" aria-hidden="true"></a></button><button type="button" class="menu_btn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="glyphicon glyphicon-search" aria-hidden="true"></a></button>', PanMore: '<div class="btn-group"><button type="button" class="menu_btn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></a></button><ul class="dropdown-menu dropdown-menu1"><li><a href="#">Resend Transaction</a></li><li><a href="#">Delete</a></li><li><a href="#">Close</a></li></ul></div>', PanContent: 'http://localhost:5000/getalltransactions' },
                        { name: 'Panel-Con2', x: 7, y: 0, width: 6, height: 4, PanLogo: 'glyphicon glyphicon-credit-card', PanBck: 'Red', PanTitle: 'Panel-Con2', PanOpts: '<button type="button" id="expand1" class="menu_btn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="glyphicon glyphicon-resize-full" aria-hidden="true"></a></button><button type="button" class="menu_btn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="glyphicon glyphicon-search" aria-hidden="true"></a></button>', PanMore: '<div class="btn-group"><button type="button" class="menu_btn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></a></button><ul class="dropdown-menu dropdown-menu1"><li><a href="#">Resend Transaction</a></li><li><a href="#">Delete</a></li><li><a href="#">Close</a></li></ul></div>', PanContent: 'http://dev.quicklinkconsultancy.com/' },
                        { name: 'Panel-Con3', x: 0, y: 5, width: 6, height: 4, PanLogo: 'glyphicon glyphicon-credit-card', PanBck: 'Black', PanTitle: 'Panel-Con3', PanOpts: '<button type="button" id="expand1" class="menu_btn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="glyphicon glyphicon-resize-full" aria-hidden="true"></a></button><button type="button" class="menu_btn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="glyphicon glyphicon-search" aria-hidden="true"></a></button>', PanMore: '<div class="btn-group"><button type="button" class="menu_btn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></a></button><ul class="dropdown-menu dropdown-menu1"><li><a href="#">Resend Transaction</a></li><li><a href="#">Delete</a></li><li><a href="#">Close</a></li></ul></div>', PanContent: 'http://localhost:5000/getallforms' },
                        { name: 'Panel-Con4', x: 7, y: 5, width: 6, height: 4, PanLogo: 'glyphicon glyphicon-credit-card', PanBck: 'white', PanTitle: 'Panel-Con4', PanOpts: '<button type="button" id="expand1" class="menu_btn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="glyphicon glyphicon-resize-full" aria-hidden="true"></a></button><button type="button" class="menu_btn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="glyphicon glyphicon-search" aria-hidden="true"></a></button>', PanMore: '<div class="btn-group"><button type="button" class="menu_btn1 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><a class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></a></button><ul class="dropdown-menu dropdown-menu1"><li><a href="#">Resend Transaction</a></li><li><a href="#">Delete</a></li><li><a href="#">Close</a></li></ul></div>', PanContent: 'http://freedom.quicklinkconsultancy.com/' }
                    ];

                    this.grid = $('.grid-stack').data('gridstack');

                    this.loadGrid = function () {
                        this.grid.removeAll();
                        var items = GridStackUI.Utils.sort(this.serializedData);
                        _.each(items, function (node) {
                            this.grid.addWidget($('<div class="grid-stack-item" data-gs-min-width="2" data-gs-min-height="3" style="overflow-x: hidden !important; overflow-y: hidden !important;"><div class="panel panel-default panel-custom grid-stack-item-content" style="overflow-x: hidden !important; overflow-y: hidden !important; background-color:' + node.PanBck + '"><div class="panel-heading panel-heading-custom ' + node.name + '"><h3 class="panel-title panel-title1"><span class="' + node.PanLogo + '" aria-hidden="true"></span> ' + node.PanTitle + '<span style="float:right;">' + node.PanOpts + node.PanMore + '</span></h3></div><div style="padding:0px!important" class="panel-body" id="' + node.Name + '"><iframe src="' + node.PanContent + '" frameborder="0" width="100%" height="100%" style="display:block; position: absolute"></iframe></div></div></div>'),
                                node.x, node.y, node.width, node.height);
                        }, this);
                        return false;
                    }.bind(this);


                    this.saveGrid = function () {
                        this.serializedData = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
                            el = $(el);
                            var node = el.data('_gridstack_node');
                            return {
                                x: node.x,
                                y: node.y,
                                width: node.width,
                                height: node.height
                            };
                        }, this);
                        $('#saved-data').val(JSON.stringify(this.serializedData, null, '    '));
                        return false;
                    }.bind(this);

                    this.clearGrid = function () {
                        this.grid.removeAll();
                        return false;
                    }.bind(this);

                    $('#save-grid').click(this.saveGrid);
                    $('#load-grid').click(this.loadGrid);
                    $('#clear-grid').click(this.clearGrid);

                    //Luke
                    $(function () {
                        $(".Panel-Con1").click(function () {
                            if ($(".Panel-Con1").hasClass('panel-heading-custom :active')); {

                                $('.Panel-Con1').css('background-color', '#f90000', '!important');
                                $('.Panel-Con2').css('background-color', '#555');
                                $('.Panel-Con3').css('background-color', '#555');
                                $('.Panel-Con4').css('background-color', '#555');
                            }
                        });
                        $(".Panel-Con2").click(function () {
                            if ($(".Panel-Con2").hasClass('panel-heading-custom :active')); {

                                $('.Panel-Con1').css('background-color', '#555');
                                $('.Panel-Con2').css('background-color', '#f90000', '!important');
                                $('.Panel-Con3').css('background-color', '#555');
                                $('.Panel-Con4').css('background-color', '#555');
                            }
                        });
                        $(".Panel-Con3").click(function () {
                            if ($(".Panel-Con3").hasClass('panel-heading-custom :active')); {

                                $('.Panel-Con1').css('background-color', '#555');
                                $('.Panel-Con2').css('background-color', '#555');
                                $('.Panel-Con3').css('background-color', '#f90000', '!important');
                                $('.Panel-Con4').css('background-color', '#555');
                            }
                        });
                        $(".Panel-Con4").click(function () {
                            if ($(".Panel-Con4").hasClass('panel-heading-custom :active')); {

                                $('.Panel-Con1').css('background-color', '#555');
                                $('.Panel-Con2').css('background-color', '#555');
                                $('.Panel-Con3').css('background-color', '#555');
                                $('.Panel-Con4').css('background-color', '#f90000', '!important');
                            }
                        });
                    });
                    this.loadGrid();
                };
            });

