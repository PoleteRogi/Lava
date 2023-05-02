/*
 _                  __      __           
| |          /\     \ \    / /     /\    
| |         /  \     \ \  / /     /  \   
| |        / /\ \     \ \/ /     / /\ \  
| |____   / ____ \     \  /     / ____ \ 
|______| /_/    \_\     \/     /_/    \_\
                                         
Free open-source 𝘸𝘦𝘣 𝘤𝘰𝘮𝘱𝘰𝘯𝘦𝘯𝘵𝘴 front-end library


Pol Romero

*/

const elements = document.querySelectorAll('body *');

let isNav = false;

// Finished Variable (For loading screen reasons)
let lavaLoaded = false;

if(window['theme'] == undefined || window['theme'] == null) {
    window['theme'] = 'light'
}

set_theme(window['theme'])

const interactables = ['button', 'input']
let variableElements = []

let style = document.createElement('style')
style.id = 'lava-style'
document.body.append(style)

style.innerHTML = 'main:not([data-scroll=\'0\']) {padding-top: 3em;}popup *{z-index:3;}*[contenteditable="true"]{outline:none !important;}body{overflow:hidden;}button{width:fit-content;height:fit-content;}main{overflow:auto;width:100vw;height:100vh;margin:0px !important;box-sizing:border-box;}body{margin:0px}nav *{margin-top:0px !important;margin-bottom:0px !important;}body{color: rgb(62, 62, 62);}button{position:relative;overflow:hidden;}button::before{content:"";transition:ease-in-out .05s;}button:hover::before{width:100vw;height:100vh;position:absolute;left:0px;top:0px;background:rgba(0,0,0,0.05)}'

let accentColor = '#24B0FF'
let secondaryColor = '#3E3E3E'

const asciiCharacters = 'abcdefghijklmnopqrstuvwxyz'

function getId() {
    result = ''
    for (let i = 0; i < 16; i++) {
        result += asciiCharacters[Math.floor(Math.random() * asciiCharacters.length)]
    }
    return result
}

function compileStyle(element) {
    style = document.getElementById('lava-style')
    element.classList.add(element.tagName.toLocaleLowerCase() + getId())
    style.innerHTML += '.' + element.className.toLocaleLowerCase() + '{' + element.getAttribute('style') + '}'
    element.style = ''
    element.removeAttribute('style')
}

var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

function loadLavaApp() {
    for (let i = 0; i < elements.length; i++) {
        document.head.appendChild(link);
        if (window[elements.item(i).tagName.toLocaleLowerCase()]) {
            eval(elements.item(i).tagName.toLocaleLowerCase() + '(elements.item(i))')
        }
        all(elements.item(i))
        if (interactables.includes(elements.item(i).tagName.toLocaleLowerCase())) {
            interactable(elements.item(i))
        }
        compileStyle(elements.item(i))
    }
    lavaLoaded = true;
}

loadLavaApp()

function react(variable) {
    if (variable.className != '') {
        variable = document.getElementsByClassName(variable.className).item(0)
    }

    var value = undefined
    try {
        value = eval(variable.getAttribute('name'))
    } catch {}

    if (window[variable.tagName.toLocaleLowerCase()] && (variable.tagName != "PROGRAMMATIC" && variable.tagName != "VARIABLE")) {
        eval('window[\'' + variable.tagName.toLocaleLowerCase() + '\'](variable)')
        all(variable)

        compileStyle(variable)
    } else if (variable.tagName == 'PROGRAMMATIC') {
        var value = undefined
        try {
            value = eval(variable.getAttribute('name').replaceAll('&lt;', '<'))
        } catch {}

        variable.innerHTML = value

        for (var i = 0; i < variable.children.length; i++) {
            var child = variable.children[i]

            if (window[child.tagName.toLocaleLowerCase()] && child.tagName != "PROGRAMMATIC") {
                eval(child.tagName.toLocaleLowerCase() + '(child)')

                all(child)
                if (interactables.includes(child.tagName.toLocaleLowerCase())) {
                    interactable(child)
                }

                compileStyle(child)
            }
        }
    }
}

function interactable(element) {
    if (element.tagName == "BUTTON") {
        let current = element.getAttribute('onclick')
        if (current == null) {
            current = ''
        }
        element.setAttribute('onclick', current + (function() {
            for (let i = 0; i < variableElements.length; i++) {
                react(variableElements[i])
            }
        }).toString().replace('function() {', '').replace('\n', '').slice(0, -1))
    } else {
        /*
        element.setAttribute('oninput', element.getAttribute('oninput') + (function() {
            for (let i = 0; i < variableElements.length; i++) {
                react(variableElements[i])
            }
        }).toString().replace('function() {', '').replace('\n', '').slice(0, -1))
        */

        let current = element.getAttribute('oninput')
        if (current == null) {
            current = ''
        }
        element.setAttribute('oninput', current + (function() {
            if (this.getAttribute('value')) {
                eval(this.getAttribute('value') + ' = this.innerHTML')
            }
        }).toString().replace('function() {', '').replace('\n', '').slice(0, -1))
    }
}

function popupAction(element) {
    if (element.style.opacity == 0) {
        openPopup(element)
    } else {
        closePopup(element)
    }
}

function openPopup(element) {
    element.style.opacity = 1
    element.style.visibility = 'visible'

    document.querySelector('nav').style.opacity = 0
    document.querySelector('bottombar').style.opacity = 0
}

function closePopup(element) {
    element.style.opacity = 0
    element.style.visibility = 'hidden'

    document.querySelector('nav').style.opacity = 1
    document.querySelector('bottombar').style.opacity = 1
}

function popup(element) {
    element.style.width = '100vw'
    element.style.height = '100vh'
    element.style.position = 'absolute'
    element.style.left = '0px'
    element.style.top = '0px'
    element.style.backdropFilter = 'blur(20px)'
    element.style.visibility = 'hidden'
    element.style.opacity = '0'
    element.style.transition = 'cubic-bezier(0.075, 0.82, 0.165, 1) 100s'
    element.style.display = 'flex'
    element.style.justifyContent = 'center'
    element.style.alignItems = 'center'

    const backSubtle = document.createElement('div')

    backSubtle.id = 'popup-subtle-back'
    backSubtle.style.width = '100vw'
    backSubtle.style.height = '100vh'
    backSubtle.style.position = 'absolute'
    backSubtle.style.left = '0px'
    backSubtle.style.top = '-3px'
    backSubtle.style.background = 'black'
    backSubtle.style.opacity = '0.4'
    backSubtle.style.zIndex = 2
    backSubtle.setAttribute('onclick', 'closePopup(document.querySelector("#' + element.id + '"))')

    element.append(backSubtle)
}

function arg_scroll(element, value) {
    if (value.includes('-')) {
        const docks = value.split('-')
        for (let i = 0; i < docks.length; i++) {
            arg_scroll(element, docks[i])
        }
    }
    else {
        if(value == 'x') {
            element.style.overflowX = 'scroll'
        }
        if(value == 'y') {
            element.style.overflowY = 'scroll'
        }
    }
}

function arg_popup(element, value) {
    let current = element.getAttribute('onclick')
    if (current == null) {
        current = ''
    }
    element.setAttribute('onclick', current + '\n' + 'popupAction(document.querySelector(\'' + value + '\'))')
}

function arg_shadow(element, value) {
    element.style.boxShadow = value
}

function arg_behavior(element, value) {
    if (value == 'button') {
        element.style.cursor = 'pointer'
    }
}

function arg_direction(element, value) {
    if (value == 'horizontal') {
        element.style.flexDirection = 'row'
    }
    if (value == 'vertical') {
        element.style.flexDirection = 'column'
    }
}

function arg_dock(element, value) {
    if (value.includes('-')) {
        const docks = value.split('-')
        for (let i = 0; i < docks.length; i++) {
            arg_dock(element, docks[i])
        }
    } else {
        if (value == 'right') {
            element.parentElement.style.position = 'relative'
            element.style.position = 'absolute'
            element.style.right = '0px'
            element.style.marginRight = '0px'
        }
        if (value == 'left') {
            element.parentElement.style.position = 'relative'
            element.style.position = 'absolute'
            element.style.left = '0px'
            element.style.marginRight = '0px'
        }
        if (value == 'top') {
            element.parentElement.style.position = 'relative'
            element.style.position = 'absolute'
            element.style.top = '0px'
            element.style.marginRight = '0px'
        }
        if (value == 'bottom') {
            element.parentElement.style.position = 'relative'
            element.style.position = 'absolute'
            element.style.bottom = '0px'
            element.style.marginRight = '0px'
        }
    }
}

function arg_color(element, value) {
    element.style.color = value
}

function arg_circle(element, value) {
    element.style.borderRadius = '50%'
}

function arg_borderradius(element, value) {
    element.style.borderRadius = value
}

function arg_borderradiustopleft(element, value) {
    element.style.borderTopLeftRadius = value
}

function arg_borderradiusbottomleft(element, value) {
    element.style.borderBottomLeftRadius = value
}

function arg_borderradiustopright(element, value) {
    element.style.borderTopRightRadius = value
}

function arg_borderradiusbottomright(element, value) {
    element.style.borderBottomRightRadius = value
}

function arg_borderall(element, value) {
    element.style.border = value + ' ' + element.style.borderColor
}

function arg_borderleft(element, value) {
    element.style.borderLeft = value + ' ' + element.style.borderColor
}

function arg_borderright(element, value) {
    element.style.borderRight = value + ' ' + element.style.borderColor
}

function arg_bordertop(element, value) {
    element.style.borderTop = value + ' ' + element.style.borderColor
}

function arg_borderbottom(element, value) {
    element.style.borderBottom = value + ' ' + element.style.borderColor
}

function arg_opacity(element, value) {
    element.style.opacity = value
}

function arg_width(element, value) {
    element.style.minWidth = value
    element.style.width = value
}

function arg_height(element, value) {
    element.style.minHeight = value
    element.style.height = value
}

function arg_title(element, value) {
    element.style.fontWeight = '700';
    element.style.fontSize = '70px';
}

function arg_titlesmall(element, value) {
    element.style.fontWeight = '700';
    element.style.fontSize = '40px';
}

function arg_titlesmaller(element, value) {
    element.style.fontWeight = '700';
    element.style.fontSize = '25px';
}

function arg_fontsize(element, value) {
    element.style.fontSize = value
}

function arg_fontweight(element, value) {
    element.style.fontWeight = value
}

function arg_value(element, value) {
    element.innerHTML = eval(value)
}

function arg_overflow(element, value) {
    element.style.overflow = value
}

function arg_overflowx(element, value) {
    element.style.overflowX = value
}

function arg_overflowy(element, value) {
    element.style.overflowY = value
}


function arg_textoverflow(element, value) {
    element.style.textOverflow = value
}

function arg_whitespace(element, value) {
    element.style.whiteSpace = value
}

function arg_theme(element, value) {
    if (value == 'dark') {
        theme = 'dark'
        element.style.color = 'white'
        if (element.tagName == 'MAIN') {
            element.style.background = '#1B1B1B'
        }
    }
}

function arg_to(element, value) {
    element.style.cursor = 'pointer'
    if(window['_lavaMoveTo'] != undefined || window['_lavaMoveTo'] != null) {
        element.setAttribute('onclick', '_lavaMoveTo(\'' + value + '\', \'' + element.getAttribute('toDirection') + '\')')
    }
    else {
        element.setAttribute('onclick', 'document.location.href = \'' + value + '\'')
    }
    
}

function arg_centerx(element, value) {
    element.style.display = 'flex'
    element.style.flexDirection = 'column'
    element.style.alignItems = 'center'
}

function arg_centery(element, value) {
    element.style.display = 'flex'
    element.style.flexDirection = 'column'
    element.style.justifyContent = 'center'
}

function arg_background(element, value) {
    value = value.replace('primary', accentColor).replace('secondary', secondaryColor)

    element.style.background = value

    if(element.style.background.startsWith('#')) {
        if (!shouldTextBeBlack(value)) {
            element.style.color = 'white'
        }
    }
}

function arg_bold(element, value) {
    element.style.fontWeight = '600'
}

function arg_select(element, value) {
    element.style.userSelect = 'text'
}

function arg_textalign(element, value) {
    element.style.textAlign = value
}

function arg_margin(element, value) {
    element.style.margin = value
}

function arg_marginleft(element, value) {
    element.style.marginLeft = value
}

function arg_marginright(element, value) {
    element.style.marginRight = value
}

function arg_margintop(element, value) {
    element.style.marginTop = value
}

function arg_marginbottom(element, value) {
    element.style.marginBottom = value
}

function arg_padding(element, value) {
    element.style.padding = value
}

function arg_paddingleft(element, value) {
    element.style.paddingLeft = value
}

function arg_paddingright(element, value) {
    element.style.paddingRight = value
}

function arg_paddingtop(element, value) {
    element.style.paddingTop = value
}

function arg_paddingbottom(element, value) {
    element.style.paddingBottom = value
}

function arg_editable(element, value) {
    element.setAttribute('contentEditable', 'true')
    interactable(element)
}

function arg_sizeauto(element, value) {
    element.style.minWidth = null
    element.style.minHeight = null
}

function shouldTextBeBlack(backgroundcolor) {
    return computeLuminence(backgroundcolor) > 0.5;
}

function computeLuminence(backgroundcolor) {
    var colors = hexToRgb(backgroundcolor);

    var components = ['r', 'g', 'b'];
    for (var i in components) {
        var c = components[i];

        colors[c] = colors[c] / 255.0;

        if (colors[c] <= 0.03928) {
            colors[c] = colors[c] / 12.92;
        } else {
            colors[c] = Math.pow(((colors[c] + 0.055) / 1.055), 2.4);
        }
    }

    var luminence = 0.2126 * colors.r + 0.7152 * colors.g + 0.0722 * colors.b;

    return luminence;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function main(element) {
    element.style.padding = '40px'
    element.style.display = 'flex'
    element.style.flexDirection = 'column'
    if (isNav) {
        element.style.position = 'absolute';
        element.style.top = '70px';
        element.style.height = 'calc(100vh - 70px)'
    }

    if(theme == 'light') {
        element.style.background = 'white'
    }
}

function all(element) {
    if (element.tagName != 'ICON') {
        //element.style.fontFamily = 'Inter, sans-serif'
        element.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    }
    if (element.tagName != 'NAV' && element.tagName != 'BOTTOMBAR' && element.tagName != "POPOUT" && element.tagName != "ICON") {
        element.style.marginTop = '2.5px'
        element.style.marginBottom = '2.5px'
    }

    element.style.transition = 'cubic-bezier(0.075, 0.82, 0.165, 1) .5s'

    if (theme == 'light') {
        element.style.borderColor = 'rgba(0, 0, 0, 0.1)'
    } else if (theme == 'dark') {
        element.style.borderColor = 'rgba(255, 255, 255, 0.1)'
    }

    element.style.userSelect = 'none';

    for (var att, i = 0, atts = element.attributes, n = atts.length; i < n; i++) {
        att = atts[i];
        if (window['arg_' + att.nodeName]) {
            window['arg_' + att.nodeName](element, att.nodeValue)
        }
    }
}

function hcontainer(element) {
    element.style.display = 'flex'
    element.style.flexDirection = 'row'
    element.style.alignItems = 'center'
}

function card(element) {
    /*
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    margin-right: 12px;
    */

    if (theme == 'light') {
        element.style.border = '1.5px solid rgba(0, 0, 0, 0.1)'
        element.style.background = '#FFFFFF'
    } else {
        element.style.border = '1.5px solid rgba(255, 255, 255, 0.1)'
        element.style.background = '#3E3E3E'
    }

    element.style.borderRadius = '10px';
    element.style.padding = '10px'
    element.style.boxSizing = 'border-box';
    element.style.minWidth = '120px';
    element.style.minHeight = '120px';
    element.style.marginRight = '2.5px';
    element.style.marginLeft = '2.5px';
    element.style.boxShadow = '-2px 4px 3px rgba(0,0,0,0.05)';
}

function vcontainer(element) {
    element.style.display = 'flex'
    element.style.flexDirection = 'column'
}

function button(element) {
    /*
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    margin-right: 12px;
    box-shadow: -2px 4px 3px rgba(0,0,0,0.05);
    */

    if (theme == 'light') {
        element.style.border = '1.5px solid rgba(0, 0, 0, 0.1)'
        //element.style.border = 'none'
        element.style.background = 'white';
    } else {
        element.style.border = '1.5px solid rgba(255, 255, 255, 0.1)'
        element.style.background = '#3E3E3E'
        element.style.color = 'white'
    }

    element.style.borderRadius = '5px';
    element.style.padding = '10px'
    element.style.boxSizing = 'border-box';
    element.style.marginLeft = '2.5px';
    element.style.marginRight = '2.5px';
    element.style.minWidth = '38px';
    element.style.display = 'flex';
    element.style.justifyContent = 'center';
    element.style.alignItems = 'center';
    element.style.cursor = 'pointer';
    element.style.boxShadow = '-2px 4px 3px rgba(0,0,0,0.05)';
}

function input(element) {
    /*
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    margin-right: 12px;
    */

    if (theme == 'light') {
        element.style.border = '1.5px solid rgba(0, 0, 0, 0.1)'
        element.style.background = 'white';
    } else {
        element.style.border = '1.5px solid rgba(255, 255, 255, 0.1)'
        element.style.background = '#3E3E3E'
        element.style.color = 'white'
    }

    element.style.borderRadius = '5px';
    element.style.padding = '10px'
    element.style.boxSizing = 'border-box';
    element.style.marginRight = '2.5px';
    element.style.marginLeft = '2.5px';
    element.style.outline = 'none'
    element.style.boxShadow = '-2px 4px 3px rgba(0,0,0,0.05)';
}


function nav(element) {
    element.style.position = 'fixed'
    element.style.left = '0px'
    element.style.top = '20px'
    element.style.width = '100vw'
    element.style.height = '50px'
    element.style.margin = '0px'
    element.style.display = 'flex'
    element.style.paddingLeft = '15px'
    element.style.paddingRight = '15px'
    element.style.alignItems = 'center'
    element.style.boxSizing = 'border-box'
    element.style.zIndex = 1;

    if (theme == 'light') {
        element.style.background = accentColor
        if (!shouldTextBeBlack(accentColor)) {
            element.style.color = 'white'
        }
        element.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)'
    } else {
        element.style.background = secondaryColor
        if (!shouldTextBeBlack(accentColor)) {
            element.style.color = 'white'
        }
        element.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)'
    }

    document.body.style.background = element.style.background

    element.style.boxShadow = '-2px 4px 3px rgba(0,0,0,0.05)';

    isNav = true;
}

function bottombar(element) {
    element.style.position = 'fixed'
    element.style.left = '0px'
    element.style.bottom = '0px'
    element.style.width = '100vw'
    element.style.height = '60px'
    element.style.margin = '0px'
    element.style.display = 'flex'
    element.style.paddingLeft = '15px'
    element.style.paddingRight = '15px'
    element.style.alignItems = 'center'
    element.style.boxSizing = 'border-box'
    element.style.zIndex = 1;

    if (theme == 'light') {
        element.style.background = '#ffffff'
        if (!shouldTextBeBlack(accentColor)) {
            element.style.color = 'white'
        }
        element.style.borderTop = '1px solid rgba(0, 0, 0, 0.1)'
    } else {
        element.style.background = secondaryColor
        if (!shouldTextBeBlack(accentColor)) {
            element.style.color = 'white'
        }
        element.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)'
    }

    element.style.boxShadow = '-2px -1px 3px rgba(0,0,0,0.05)';

}

function icon(element) {
    element.style.width = '100%'
    element.style.height = '100%'
    element.style.margin = '0px'
    element.style.padding = '0px'
    element.style.textAlign = 'center'
    element.style.position = 'absolute'
    element.style.left = '0px'
    element.style.top = '0px'
    element.style.display = 'flex'
    element.style.alignItems = 'center'
    element.style.justifyContent = 'center'
    if (element.parentElement.style.position != '') {
        element.parentElement.style.position = 'relative'
    }
    element.style.boxShadow = '-2px 4px 3px rgba(0,0,0,0.05)';
}

function variable(element) {
    console.log('variable')
    var value = undefined
    try {
        value = eval(element.innerText)
    } catch {}

    element.setAttribute('name', element.innerText)
    element.innerText = value
    variableElements.push(element)
}

function programmatic(element) {
    element.innerHTML = element.innerHTML.replaceAll('%', '\'').replaceAll('\t', '').replaceAll('\n', '').trim()

    element.setAttribute('name', element.innerHTML)

    react(element)

    variableElements.push(element)
}

function set_accentcolor(value) {
    accentColor = value
}

function set_secondarycolor(value) {
    secondaryColor = value
}

function set_theme(value) {
    for (let i = 0; i < elements.length; i++) {
        elements.item(i).setAttribute('theme', value)
    }
    theme = value
}

function settings(element) {
    element.style.display = 'none'
    element.style.visibility = 'hidden'

    for (const child of element.children) {
        if (window['set_' + child.tagName.toLocaleLowerCase()]) {
            window['set_' + child.tagName.toLocaleLowerCase()](child.innerText)
        }
    }
    element.remove()
}

function chip(element) {
    element.style.padding = '7.5px'
    element.style.borderRadius = '.5em'
    if (theme == 'light') {
        element.style.border = '1px solid rgba(0, 0, 0, 1)'
        element.style.background = 'transparent'
    } else {
        element.style.border = '1px solid rgba(255, 255, 255, 0.1)'
        element.style.background = 'rgb(40, 40, 40)'
    }
    element.style.boxShadow = '-2px 4px 3px rgba(0,0,0,0.05)';
}

function popout(element) {
    element.parentElement.style.position = 'relative'
    element.style.margin = '0px'
    let x = 0
    let y = 0
    if (element.getAttribute('dock') == 'null') {
        return
    }

    if (element.getAttribute('dock').includes('left')) {
        x = '-50'
    }

    if (element.getAttribute('dock').includes('right')) {
        x = '50'
    }

    if (element.getAttribute('dock').includes('top')) {
        y = '-50'
    }

    if (element.getAttribute('dock').includes('bottom')) {
        y = '50'
    }
    element.style.transform = 'translate(' + x + '%, ' + y + '%)'
    
}

function bold(element) {
    element.innerHTML = '<b>' + element.innerHTML + '</b>'
}

document.body.innerHTML = document.body.innerHTML.replace('\n', '')