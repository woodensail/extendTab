/** jQuery extendTab
 * @author Wooden Sail <http://www.woodensail.net>
 * @requires jQuery
 * Usage $.extendTab()
 */

(function ($) {
    $.extendTab = function () {
        $('[tabindex]').each(function (i, v) {
            var _this = $(v);
            var flag = true;
            $.each($.extendTab.default.init, function (key, value) {
                if (_this.hasClass(key)) {
                    value(_this);
                    flag = false;
                    return false;
                }
            });
            if (flag) {
                _this.attr('data-tabindex', _this.attr('tabindex'));
            }
        });
        var tabList = $('[data-tabindex]').sort(function (a, b) {
            return $(a).data('tabindex') > $(b).data('tabindex')
        });
        tabList.off('keydown.extendTab');
        tabList.on('keydown.extendTab', function (e) {
            var target = $(e.currentTarget);
            if ($.extendTab.default.forwardKey.contains(e.keyCode)) {
                var flag = true;
                $.each($.extendTab.default.execute, function (key, value) {
                    if (target.hasClass(key)) {
                        flag = value(target);
                        return false;
                    }
                });
                if (flag) {
                    var _idx = tabList.index(this) + 1;
                    tabList.eq(_idx >= (tabList.length) ? 0 : _idx).focus();
                    e.preventDefault();
                }
            } else if ($.extendTab.default.backwardKey.contains(e.keyCode)) {
                var flag = true;
                $.each($.extendTab.default.execute, function (key, value) {
                    if (target.hasClass(key)) {
                        flag = value(target);
                        return false;
                    }
                });
                if (flag) {
                    tabList.eq(tabList.index(this) - 1).focus();
                    e.preventDefault();
                }
            }
        });
    };

    $.extendTab.default = {
        init       : {
            'combo-f': function (jq) {
                jq.next().find('.combo-text').attr('data-tabindex', jq.attr('tabindex'));
            }
        },
        execute    : {
            'combo-text': function (jq) {
                clearTimeout(jq.parent().prev().data('combo').timer);
                return true;
            }
        },
        forwardKey : [39, 13],
        backwardKey: [37]
    }
})(jQuery);