/**
 * 判断对象是否修改，返回修改项的键
 * @param {object} form
 * @param {object} old_form
 */
export function compareFrom(form, old_form) {
  let is_changed = false
  const changes = []
  // 判断修改项
  for (const i in old_form) {
    // 注意引用类型 object !
    if (typeof form[i] === 'object') {
      if (form[i].toString() !== old_form[i].toString()) {
        is_changed = true
        changes.push(i)
      }
    } else {
      if (form[i] !== old_form[i]) {
        is_changed = true
        changes.push(i)
      }
    }
  }
  return {
    is_changed,
    changes
  }
}
