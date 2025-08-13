拉下来删除git


在uniapp中，以下代码会有警告为什么
const instance = getCurrentInstance()
const components = instance?.appContext.components
console.log('components-----121', components)
const hasMyEmpty = components && 'MyEmpty' in components

  <slot v-else name="empty">
            <MyEmpty v-if="hasMyEmpty" ></MyEmpty>
            <up-empty v-else mode="list"> </up-empty>
</slot>

警告内容在下面
[Vue warn]: Failed to resolve component: MyEmpty
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement. 
