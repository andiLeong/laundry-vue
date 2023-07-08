<script setup></script>

<template>
    <h1 class="text-sky-600">Hello App!</h1>

    <h1 className="text-3xl font-bold underline">Hello world!</h1>

    <p class="text-red-500 bg-blue-400">
        <!-- use the router-link component for navigation. -->
        <!-- specify the link by passing the `to` prop. -->
        <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
        <router-link to="/">Go to Home</router-link>
        <router-link to="/about">Go to About</router-link>
    </p>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
</template>
