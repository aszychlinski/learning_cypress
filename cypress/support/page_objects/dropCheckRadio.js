class dropCheckRadio_ {
    checkBoxes = '#checkboxes';
    radioButtons = '#radio-buttons';

    dropDowns = {
        1: ['JAVA', 'C#', 'Python', 'SQL'],
        2: ['Eclipse', 'Maven', 'TestNG', 'JUnit'],
        3: ['HTML', 'CSS', 'JavaScript', 'JQuery']
    }

    paramDropDownMenu(value) {
        return `[id^=dropdowm-menu-${value}]`
    }
}

export const dropCheckRadio = new dropCheckRadio_()