/* global Element */
var yo = require('yo-yo')
var css = require('./styles/tooltip-styles')
var modal = require('./modal-dialog-custom')

/**
 * Open a tooltip
 * @param {string} tooltipText The text shown by the tooltip
 * @param {function} [action] Returns An HTMLElement to display for action
 */
module.exports = function addTooltip (tooltipText, action, opts) {
  action = action || function () { return yo`<div></div>` }
  let t = new Toaster()
  return t.render(tooltipText, action(t), opts)
}

class Toaster {
  hide () {
    if (this.id) clearTimeout(this.id)
    setTimeout(() => {
      // remove from body after the animation is finished
      if (this.tooltip.parentElement) this.tooltip.parentElement.removeChild(this.tooltip)
    }, 2000)
    animation(this.tooltip, css.animateTop.className)
  }
  render (tooltipText, actionElement, opts) {
    opts = defaultOptions(opts)
<<<<<<< HEAD
<<<<<<< HEAD
    let canShorten = true
    if (tooltipText instanceof Element) {
      canShorten = false
    } else {
      if (typeof tooltipText === 'object') {
        if (tooltipText.message) {
          tooltipText = tooltipText.message
        } else {
          try {
            tooltipText = JSON.stringify(tooltipText)
          } catch (e) {
          }
=======
    if (typeof (tooltipText) === 'object' && tooltipText.message !== undefined) {
      tooltipText = tooltipText.message
    }
=======
>>>>>>> 9211c21f... removed double implementation

    if (typeof tooltipText === 'object') {
      if (tooltipText.message) {
        tooltipText = tooltipText.message
      } else {
        try {
          tooltipText = JSON.stringify(tooltipText)
        } catch (e) {
>>>>>>> c2943a2b... tandard
        }
      }
    }

    return new Promise((resolve, reject) => {
      const shortTooltipText = (canShorten && tooltipText.length > 201) ? tooltipText.substring(0, 200) + '...' : tooltipText

      let button = tooltipText.length > 201 ? yo`
      <button class="btn btn-secondary btn-sm mx-3" style="white-space: nowrap;" onclick=${() => { modal.alert(tooltipText) }}>Show full message</button>
      ` : ``

      this.tooltip = yo`
        <div class="${css.tooltip} alert alert-info p-2"  onmouseenter=${() => { over() }} onmouseleave=${() => { out() }}>
          <span class="px-2">
            ${shortTooltipText}
            ${button}
            ${actionElement}
          </span>
          <span style="align-self: baseline;">
            <button class="fas fa-times btn-info mx-1 p-0" onclick=${() => {
              this.hide()
              over()
              resolve()
            }}></button>
          </span>
        </div>`
      let timeOut = () => {
        return setTimeout(() => {
          if (this.id) {
            this.hide()
            resolve()
          }
        }, opts.time)
      }
      let over = () => {
        if (this.id) {
          clearTimeout(this.id)
          this.id = null
        }
      }
      let out = () => {
        if (!this.id) this.id = timeOut()
      }
      this.id = timeOut()
      document.body.appendChild(this.tooltip)
      animation(this.tooltip, css.animateBottom.className)
    })
  }
}

let defaultOptions = (opts) => {
  opts = opts || {}
  return {
    time: opts.time || 7000
  }
}

let animation = (tooltip, anim) => {
  tooltip.classList.remove(css.animateTop.className)
  tooltip.classList.remove(css.animateBottom.className)
  void tooltip.offsetWidth // trick for restarting the animation
  tooltip.classList.add(anim)
}
