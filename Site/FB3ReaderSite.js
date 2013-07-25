/// <reference path="FB3ReaderSiteHead.ts" />
var FB3ReaderSite;
(function (FB3ReaderSite) {
    var ExampleSite = (function () {
        function ExampleSite(Canvas) {
            this.Canvas = Canvas;
            this.Progressor = new ExampleProgressor('AlertSpan', 'MessSpan', 'ProgressSpan');
            this.IdleThreadProgressor = new ExampleProgressor('IdleAlertSpan', 'IdleMessSpan', 'IdleProgressSpan');
            this.Alert = this.Progressor.Alert;
        }
        ExampleSite.prototype.getElementById = function (elementId) {
            return document.getElementById(elementId);
        };
        return ExampleSite;
    })();
    FB3ReaderSite.ExampleSite = ExampleSite;
    var ExampleProgressor = (function () {
        function ExampleProgressor(AlertSpan, MessSpan, ProgressSpan) {
            this.AlertSpan = AlertSpan;
            this.MessSpan = MessSpan;
            this.ProgressSpan = ProgressSpan;
            this.Hourglasses = {};
            this.Progresses = {};
        }
        ExampleProgressor.prototype.Alert = function (Message) {
            document.getElementById(this.AlertSpan).innerHTML = Message;
        };
        ExampleProgressor.prototype.HourglassOn = function (Owner, Message) {
            this.Hourglasses[Owner.toString()] = 1;
            document.getElementById(this.MessSpan).innerHTML = Message;
        };
        ExampleProgressor.prototype.Progress = function (Owner, Progress) {
            this.Progresses[Owner] = Progress;
            var N = 0;
            var OverallProgress = 0;
            for (var Progress in this.Progresses) {
                N++;
                OverallProgress = this.Progresses[Progress];
            }
            OverallProgress = OverallProgress / N;
            document.getElementById(this.ProgressSpan).innerHTML = OverallProgress.toFixed(1);
        };
        ExampleProgressor.prototype.HourglassOff = function (Owner) {
            this.Hourglasses[Owner] = 0;
            var HaveLive = 0;
            for (var Hourglass in this.Hourglasses) {
                if (this.Hourglasses[Hourglass] > 0) {
                    HaveLive = 1;
                    break;
                }
            }
            if (!HaveLive) {
                this.Hourglasses = {};
                this.Progresses = {};
            } else {
                this.Progress(Owner, 100);
            }
        };
        ExampleProgressor.prototype.Tick = function (Owner) {
            if (!this.Progresses[Owner]) {
                this.Progresses[Owner] = 1;
            } else if (this.Progresses[Owner] < 99) {
                this.Progresses[Owner] += 1;
            }
            this.Progress(Owner, this.Progresses[Owner]);
        };
        return ExampleProgressor;
    })();
    FB3ReaderSite.ExampleProgressor = ExampleProgressor;
})(FB3ReaderSite || (FB3ReaderSite = {}));
//@ sourceMappingURL=FB3ReaderSite.js.map
