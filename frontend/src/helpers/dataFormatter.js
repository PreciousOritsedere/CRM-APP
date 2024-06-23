import dayjs from 'dayjs';

export default {
    filesFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            name: item.name,
            publicUrl: item.publicUrl || ''
        }))
    },
    imageFormatter(arr) {
        if (!arr || !arr.length) return []
        return arr.map(item => ({
            publicUrl: item.publicUrl || ''
        }))
    },
    oneImageFormatter(arr) {
        if (!arr || !arr.length) return ''
        return arr[0].publicUrl || ''
    },
    dateFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD')
    },
    dateTimeFormatter(date) {
        if (!date) return ''
        return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    booleanFormatter(val) {
        return val ? 'Yes' : 'No'
    },

        usersManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.firstName)
        },
        usersOneListFormatter(val) {
            if (!val) return ''
            return val.firstName
        },
        usersManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.firstName}
            });
        },
        usersOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.firstName, id: val.id}
        },

        contactsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.email)
        },
        contactsOneListFormatter(val) {
            if (!val) return ''
            return val.email
        },
        contactsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.email}
            });
        },
        contactsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.email, id: val.id}
        },

        leadsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.source)
        },
        leadsOneListFormatter(val) {
            if (!val) return ''
            return val.source
        },
        leadsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.source}
            });
        },
        leadsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.source, id: val.id}
        },

        tagsManyListFormatter(val) {
            if (!val || !val.length) return []
            return val.map(item => item.name)
        },
        tagsOneListFormatter(val) {
            if (!val) return ''
            return val.name
        },
        tagsManyListFormatterEdit(val) {
            if (!val || !val.length) return []
            return val.map((item) => {
              return {id: item.id, label: item.name}
            });
        },
        tagsOneListFormatterEdit(val) {
            if (!val) return ''
            return {label: val.name, id: val.id}
        },

}
