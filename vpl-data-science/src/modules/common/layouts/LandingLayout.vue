<template>
    <div class="flex flex-col h-screen">
        <!-- Header -->
        <header
            class="flex items-center h-14 px-4 border-b border-gray-300 sm:h-16 md:px-6 lg:px-8"
        >
            <div>
                <a class="flex items-center gap-2 font-semibold" href="#">
                    <img
                        alt="Vue logo"
                        class="logo"
                        src="@/assets/logo.svg"
                        width="40"
                        height="40"
                    />
                </a>
            </div>
            <nav class="flex flex-col ml-auto space-x-4 items-end h-10 sm:space-x-6">
                <div class="space-x-4">
                    <RouterLink :to="{ name: 'HomePage' }"> Home </RouterLink>
                    <RouterLink :to="{ name: 'VplDataScience' }"> Vpl DataScience </RouterLink>
                    <RouterLink :to="{ name: 'VplWiki' }"> Wiki </RouterLink>
                    <RouterLink :to="{ name: 'AboutUs' }"> About Us </RouterLink>
                </div>
            </nav>
        </header>
        <!-- Fin Header -->

        <!-- Main -->
        <main class="flex-1 flex h-[100%] overflow-auto">
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>

            <!-- <RouterView /> -->
        </main>
        <!-- Fin Main -->

        <!-- Footer -->
        <footer
            class="flex items-center h-14 px-4 border-t border-gray-300 sm:h-16 md:px-6 lg:px-8"
        >
            <p class="flex-1 text-sm text-gray-500 text-center">
                © {{ new Date().getFullYear() }} Universidad Distrital Francisco Jose de Caldas -
                Facultad Tecnologica
            </p>
        </footer>
        <!-- Fin Footer -->
    </div>
</template>
