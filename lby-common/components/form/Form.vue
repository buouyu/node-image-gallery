<template>
  <up-form
    :labelWidth="props.formOption.labelWidth"
    labelPosition="left"
    :model="props.model"
    :rules="rules"
    ref="formRef"
  >
    <up-form-item
      v-for="(field, index) in props.fields"
      :key="index"
      :label="field.label"
      :prop="field.prop"
    >
      <Field v-model="props.model[field.prop]" :field="field">
        <template v-if="field.fieldType == 'slot'" #[field.slotName]>
          <slot :name="field.slotName"></slot>
        </template>
      </Field>
    </up-form-item>

    <up-row
      v-if="props.formOption.btns"
      justify="space-between"
      :customStyle="props.formOption.btnCustomStyle"
    >
      <up-col
        v-for="(item, index) in props.formOption.btns"
        :key="index"
        :span="item.span"
      >
        <up-button :type="item.type" @click="() => handleBtnClick(item)">{{
          item.text
        }}</up-button>
      </up-col>
    </up-row>
  </up-form>
  <!-- <up-button @click="test1" text="test"></up-button> -->
</template>

<script setup>
import { ref, defineProps, watch, onMounted, onUpdated, reactive } from 'vue'
import Field from './Field.vue'
// { formOption, fields, model }
const props = defineProps(['formOption', 'fields', 'model'])
const rules = ref({})
const formRef = ref(null)
const handleBtnClick = async (item) => {
  // JSON.stringify(formRef.value.formRules) !== '{}'
  if (item.isPreValid) {
    try {
      const valid = await formRef.value.validate()
      valid && item.click()
    } catch (error) {
      console.log('valid-error:', error)
    }
  } else {
    item.click()
  }
}
const generateRules = (fields) => {
  const rules = {}
  const addRule = (prop, rule) => {
    rule.trigger = ['blur']
    if (rules[prop]) {
      rules[prop].push(rule)
    } else {
      rules[prop] = [rule]
    }
  }
  for (const field of fields) {
    if (field.required) {
      addRule(field.prop, {
        required: true,
        message: '请输入' + field.label,
      })
    }
    if (field.len) {
      if (typeof field.len == 'number') {
        addRule(field.prop, {
          required: true,
          len: field.len,
          message: `请填写${field.len}位${field.label}`,
        })
      } else {
        const [min, max] = field.len
        if (min && max) {
          addRule(field.prop, {
            required: true,
            min,
            max,
            message: `请填写${min}-${max}字符`,
          })
        } else if (min) {
          addRule(field.prop, {
            required: true,
            min,
            message: `请填写不少于${min}位字符`,
          })
        } else if (max) {
          addRule(field.prop, {
            required: true,
            max,
            message: `请填写不多于${max}位字符`,
          })
        }
      }
    }
    if (field.ruleType == 'phone') {
      addRule(field.prop, {
        validator: (rule, value, callback) => {
          return uni.$u.test.mobile(value)
        },
        message: `手机号码不正确`,
      })
    }
  }

  return rules
}

onUpdated(() => {
  init()
})
const init = async () => {
  const rules = generateRules(props.fields)
  formRef.value.setRules(rules)
}
onMounted(() => {
  init()
})
</script>

<style scoped lang="scss"></style>
