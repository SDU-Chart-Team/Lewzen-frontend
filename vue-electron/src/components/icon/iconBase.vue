<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="467" height="462" id="source">
       <rect x="0" y="0" width="250" height="250" rx="20" style="fill:#ff0000; stroke:#000000;stroke-width:2px;"/>
       <rect x="140" y="120" width="250" height="250" rx="40" style="fill:#0000ff; stroke:#000000; stroke-width:2px; fill-opacity:0.7;"/>
    </svg>
</template>
<script>
    export default {
        name:'iconBase',
        props: {
            iconName: {
                type: String,
                default: 'box'
            },
            width: {
                type: [Number, String],
                default: 18
            },
            height: {
                type: [Number, String],
                default: 18
            },
            iconColor: {
                type: String,
                default: 'currentColor'
            }
        }
    }
</script>

<style scoped>

</style>