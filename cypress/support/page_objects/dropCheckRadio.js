class dropCheckRadio_ {
    checkBoxes = '#checkboxes';
    radioButtons = '#radio-buttons';
    allDropDownMenus = '[id^=dropdowm-menu-]';

    paramDropDownMenu(value) {
        return `[id^=dropdowm-menu-${value}]`
    }
}

export const dropCheckRadio = new dropCheckRadio_()