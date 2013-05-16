/// <reference path="FB3DataProviderHead.ts" />
var FB3DataProvider;
(function (FB3DataProvider) {
    var AJAXDataProvider = (function () {
        function AJAXDataProvider() { }
        AJAXDataProvider.prototype.Request = function (ArtID, Callback, Progressor, CustomData) {
            new AjaxLoader(this.ArtID2URL(ArtID), Callback, Progressor, CustomData);
        };
        AJAXDataProvider.prototype.ArtID2URL = function (ArtID, Chunk) {
            var OutURL = '/DataProvider/AjaxExample/' + ArtID + '.';
            if (Chunk == null) {
                OutURL += 'toc.js';
            } else {
                OutURL += Chunk + '.js?rand=' + Math.random();
            }
            return OutURL;
        };
        return AJAXDataProvider;
    })();
    FB3DataProvider.AJAXDataProvider = AJAXDataProvider;    

    var AjaxLoader = (function () {
        function AjaxLoader(URL, Callback, Progressor, CustomData) {
            this.URL = URL;
            this.Callback = Callback;
            this.Progressor = Progressor;
            this.CustomData = CustomData;
            var _this = this;
            this.Progressor.HourglassOn(this, false, 'Loading ' + URL);
            this.Req = this.HttpRequest();
            try  {
                this.Req.addEventListener("progress", function (e) {
                    return _this.onUpdateProgress(e);
                }, false);
                this.Req.addEventListener("error", function (e) {
                    return _this.onTransferFailed(e);
                }, false);
                this.Req.addEventListener("abort", function (e) {
                    return _this.onTransferAborted(e);
                }, false);
            } catch (e) {
            }
            this.Req.onreadystatechange = function () {
                return _this.onTransferComplete();
            };
            this.Req.open('GET', URL, true);
            this.Req.send(null);
        }
        AjaxLoader.prototype.onTransferComplete = function () {
            try  {
                if (this.Req.readyState != 4) {
                    this.Progressor.Tick(this);
                } else {
                    this.Progressor.HourglassOff(this);
                    if (this.Req.status == 200) {
                        this.Callback(this.parseJSON(this.Req.responseText), this.CustomData);
                    } else {
                        this.Progressor.Alert('Failed to load "' + this.URL + '", server returned error "' + this.Req.status + '"');
                    }
                }
            } catch (err) {
                this.Progressor.HourglassOff(this);
                this.Progressor.Alert('Failed to load "' + this.URL + '" (unknown error "' + err.description + '")');
            }
        };
        AjaxLoader.prototype.onUpdateProgress = function (e) {
            this.Progressor.Progress(this, e.loaded / e.total * 100);
        };
        AjaxLoader.prototype.onTransferFailed = function (e) {
            this.Progressor.HourglassOff(this);
            this.Progressor.Alert('Failed to load "' + URL + '"');
        };
        AjaxLoader.prototype.onTransferAborted = function (e) {
            this.Progressor.HourglassOff(this);
            this.Progressor.Alert('Failed to load "' + URL + '" (interrupted)');
        };
        AjaxLoader.prototype.HttpRequest = function () {
            var ref = null;
            if (window.XMLHttpRequest) {
                ref = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                ref = new ActiveXObject("MSXML2.XMLHTTP.3.0");
            }
            return ref;
        };
        AjaxLoader.prototype.parseJSON = function (data) {
            if (data === undefined || data == '') {
                return null;
            }
            return (new Function("return " + data))();
        };
        return AjaxLoader;
    })();    
})(FB3DataProvider || (FB3DataProvider = {}));
//@ sourceMappingURL=FB3AjaxDataProvider.js.map
