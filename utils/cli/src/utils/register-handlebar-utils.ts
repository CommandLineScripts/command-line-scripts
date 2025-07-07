import Handlebars from 'handlebars'

export const registerHandlebarUtils = () => {
  // 1. JSON helper
  Handlebars.registerHelper('json', function (context) {
    return JSON.stringify(context, null, 2) // pretty print with 2 spaces
  })

  // 2. PascalCase helper
  Handlebars.registerHelper('pascal', function toPascalCase(str: string) {
    if (!str) return ''
    return str.replace(/(^\w|[-_.]\w)/g, clearAndUpper)

    function clearAndUpper(text: string) {
      return text.replace(/[-_.]/, '').toUpperCase()
    }
  })
}
