<script setup>
import { ref, reactive, computed, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useReportsStore } from "@/stores/Reports/reports";
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleBar from '@/components/SectionTitleBar.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioPicker from '@/components/FormCheckRadioPicker.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import SectionHeroBar from '@/components/SectionHeroBar.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import Editor from '@tinymce/tinymce-vue'
import { notify } from "@kyvg/vue3-notification";

const reportsStore = useReportsStore()
const router = useRouter();

const notification = computed(() => reportsStore.notify)
const titleStack = ref(['Admin', 'Reports'])

        const optionsOwner = computed(() => reportsStore.searchResultOwner);

const form = reactive({

      name: '',

    description: '',

      type: '',

      owner: '',

})

onBeforeMount(async () => {

  await searchOwner();

})

const submit = async () => {
  try {

            form.owner = form.owner.id;

    await reportsStore.newItem({ ...form })
    router.push('/reports');
  } catch (e) {
    console.log(e);
  }
}

const reset = () => {

        form.name = '';

      form.description = '';

        form.type = '';

        form.owner = '';

}

const cancel = () => {
  router.push('/users')
}

    async function searchOwner(val) {
      await reportsStore.searchOwner(val);
    }

watch(() => reportsStore.notify.showNotification, (newValue, oldValue) => {
  if(newValue){
    notify({
      title: "Reports notification",
      text: notification.value.textNotification,
      type: notification.value.typeNotification,
    });
    reportsStore.hideNotification()
  }
});

</script>

<template>
  <SectionTitleBar :title-stack="titleStack" />
  <SectionHeroBar>New Reports</SectionHeroBar>

  <SectionMain>
    <CardBox
      title="New Reports"
      form
      @submit.prevent="submit"
    >

    <FormField
      label="ReportName"
    >
      <FormControl
        v-model="form.name"
        placeholder="Your ReportName"
      />
    </FormField>

    <label class="block font-bold mb-2 text-pavitra-700 text-sm">Description</label>
    <Editor
      api-key="s0bs8snu2u6qo8skn5r3kurkerhbaagpsgm9cdkbxnbo8nj4"
      cloudChannel="6"
      v-model="form.description"
      />

    <FormField
      label="Type"
    >
      <FormControl
        v-model="form.type"
        placeholder="Your Type"
      />
    </FormField>

  <FormField
      label="Owner"
    >
        <v-select
          v-model="form.owner"
          :options="optionsOwner"
          @input="searchOwner($event.target.value)"
        />
  </FormField>

    <BaseDivider />

    <BaseButtons>
      <BaseButton
        type="submit"
        color="info"
        label="Submit"
      />
      <BaseButton
        type="reset"
        color="info"
        outline
        label="Reset"
        @click="reset"
      />
      <BaseButton
        type="cancel"
        color="danger"
        outline
        label="Cancel"
        @click="cancel"
      />
    </BaseButtons>
  </CardBox>
</SectionMain>

</template>
