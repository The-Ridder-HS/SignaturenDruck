const _ = require('lodash')
const jsonfile = require('./JsonFile')

class Print {
  get dataAll () {
    return this._dataAll.all
  }
  constructor (file, formats, manuelSignature) {
    this.formats = formats
    this.manualSignature = manuelSignature
    this.jsonFile = JSON.parse(jsonfile.readFile(file))
    this._dataAll = {
      all: []
    }
    this.elements = document.querySelectorAll('[name=toPrint]')
    this.getSelectedElementsToPrint()
  }

  getSelectedElementsToPrint () {
    let wak = []
    _.each(this.elements, (k, v) => {
      let dataStructure = {
        id: '',
        count: '1',
        format: '',
        isShort: false,
        data: ''
      }
      if (k.checked) {
        let parentRow = k.parentNode.parentNode
        dataStructure.id = v
        dataStructure.count = setCount(parentRow)
        dataStructure.format = setFormat.bind(this,parentRow)()
        dataStructure.isShort = setShort(parentRow)
        dataStructure.data = setData.bind(this, parentRow)()
        wak.push(dataStructure)
      }
    })
    this._dataAll.all = setFormatInformation.bind(this,_.groupBy(wak, 'format.name'))()
  }
}

function setShort (parentRow) {
  if (parentRow.getElementsByClassName('shortShelfmarkCell')[0].firstChild !== null)  return parentRow.getElementsByClassName('shortShelfmarkCell')[0].firstChild.checked
  else return false
}
function setCount (parentRow) {
  return parseInt(parentRow.getElementsByClassName('printCountCell')[0].firstChild.value)
}

function setFormat (parentRow) {
  return this.formats[parentRow.getElementsByClassName('select')[0].firstChild.value.toString()]
}

function setFormatInformation (arr) {
  let b = []
  _.each(arr, (v,k) => {
    let structure = {
      formatInformation : '',
      printInformation: ''
    }
    structure.formatInformation = this.formats[k]
    structure.printInformation = v
    b.push(structure)
  })
  return b
}

function setData (parentRow) {
  let id = parentRow.id.split('-')
  if(id[0] === 'manual') return this.manualSignature[id[1]]
  else return _.find(this.jsonFile, {id: parseInt(id[1]) + 1, PPN: id[0]})
}

module.exports = Print