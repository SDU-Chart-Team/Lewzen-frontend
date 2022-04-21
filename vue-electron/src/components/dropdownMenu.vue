<template>
    <div>
        <el-dropdown>
        <span class="el-dropdown-link">
            File
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>new</el-dropdown-item>
                <el-dropdown-item>open</el-dropdown-item>
                <el-dropdown-item>save</el-dropdown-item>
                <el-dropdown-item>rename</el-dropdown-item>
                <el-dropdown-item disabled>close</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
        <span class="el-dropdown-link">
            Edit
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>cut</el-dropdown-item>
                <el-dropdown-item>copy</el-dropdown-item>
                <el-dropdown-item>undo</el-dropdown-item>
                <el-dropdown-item disabled>redo</el-dropdown-item>
                <el-dropdown-item divided>select all</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
        <span class="el-dropdown-link">
            View
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>scrollbars</el-dropdown-item>
                <el-dropdown-item>grid</el-dropdown-item>
                <el-dropdown-item>guides</el-dropdown-item>
                <el-dropdown-item disabled>tags</el-dropdown-item>
                <el-dropdown-item divided>view</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
        <span class="el-dropdown-link">
            Arrange
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>toFront</el-dropdown-item>
                <el-dropdown-item>toBack</el-dropdown-item>
                <el-dropdown-item>insert</el-dropdown-item>
                <el-dropdown-item disabled>layout</el-dropdown-item>
                <el-dropdown-item divided>Group</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
        <span class="el-dropdown-link">
            Extras
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>theme</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
        <span class="el-dropdown-link">
            Help
        </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>fork me</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "dropdownMenu"
    }
</script>

<style scoped>
    .el-dropdown-link {
        cursor: pointer;
        padding-right: 20px;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }

</style>