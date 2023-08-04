<script setup>
import { ref } from 'vue';
// import BlueBg from '@/assets/blue-bg.jpg';
</script>

<template>
    <!--  navigation-->
    <nav class="bg-purple-50">
        <div class="mx-auto max-w-7xl">
            <div class="flex justify-between items-center px-4 py-5">
                <div>logo</div>
                <div>
                    <ul class="flex items-start gap-x-3">
                        <li>
                            <a
                                href=""
                                style="
                                    color: #374151;
                                    font-size: 14px;
                                    font-style: normal;
                                    font-weight: 700;
                                    line-height: 12.437px;
                                "
                                >Home</a
                            >
                        </li>
                        <li>
                            <a
                                href=""
                                class=""
                                style="
                                    color: #374151;
                                    font-size: 14px;
                                    font-style: normal;
                                    font-weight: 700;
                                    line-height: 12.437px;
                                "
                                >Services</a
                            >
                        </li>

                        <li>
                            <a
                                href=""
                                style="
                                    color: #374151;
                                    font-size: 14px;
                                    font-style: normal;
                                    font-weight: 700;
                                    line-height: 12.437px;
                                "
                                >Promos</a
                            >
                        </li>
                    </ul>
                </div>
                <div>
                    <button
                        class="flex items-center"
                        style="
                            color: #374151;
                            font-size: 14px;
                            font-style: normal;
                            font-weight: 700;
                            line-height: 12.437px;
                        "
                    >
                        login
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="none"
                            class="ml-2 h-5 w-5"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5 10C5 9.58579 5.33579 9.25 5.75 9.25H12.3879L10.2302 7.29063C9.93159 7.00353 9.92228 6.52875 10.2094 6.23017C10.4965 5.93159 10.9713 5.92228 11.2698 6.20938L14.7698 9.45938C14.9169 9.60078 15 9.79599 15 10C15 10.204 14.9169 10.3992 14.7698 10.5406L11.2698 13.7906C10.9713 14.0777 10.4965 14.0684 10.2094 13.7698C9.92228 13.4713 9.93159 12.9965 10.2302 12.7094L12.3879 10.75H5.75C5.33579 10.75 5 10.4142 5 10Z"
                                fill="#0F172A"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!--  home hero-->
    <main class="">
        <section class="mx-auto max-w-7xl">
            <div style="padding-top: 37px; padding-bottom: 37px">
                <div
                    id="hero-left"
                    style="margin-bottom: 150px"
                    class="mx-10 grid grid-cols-2 gap-5 items-end"
                >
                    <div class="grid-cols-1 pt-80">
                        <h1
                            class="mb-3"
                            style="
                                color: #000;
                                font-family: Noto Sans JP;
                                font-size: 48px;
                                font-style: normal;
                                font-weight: 900;
                                line-height: normal;
                            "
                        >
                            We're changing the way people connect.
                        </h1>
                        <p
                            class="mb-1"
                            style="
                                color: #6b7280;
                                font-family: Noto Sans JP;
                                font-size: 16px;
                                font-style: normal;
                                font-weight: 400;
                                line-height: normal;
                            "
                        >
                            Anim aute id magna aliqua ad ad non deserunt sunt.
                            Qui irure qui lorem cupidatat commodo. Elit sunt
                            amet fugiat veniam occaecat fugiat aliqua. Anim aute
                            id magna aliqua ad ad non deserunt sunt. Qui irure
                            qui lorem cupidatat commodo.
                        </p>

                        <div style="padding-top: 16px">
                            <button
                                class="flex items-center"
                                style="
                                    color: #fff;
                                    font-family: Inter;
                                    font-size: 14px;
                                    font-style: normal;
                                    font-weight: 500;
                                    line-height: 20px;
                                    padding: 8px 16px;
                                    border-radius: 6px;
                                    background: #b170c3;
                                    box-shadow: 0px 1px 2px 0px
                                        rgba(0, 0, 0, 0.05);
                                "
                            >
                                Get Started
                                <svg
                                    style="width: 20px; height: 20px"
                                    class="ml-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="21"
                                    height="20"
                                    viewBox="0 0 21 20"
                                    fill="none"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M5.77502 10C5.77502 9.58579 6.11081 9.25 6.52502 9.25H13.1629L11.0052 7.29063C10.7066 7.00353 10.6973 6.52875 10.9844 6.23017C11.2715 5.93159 11.7463 5.92228 12.0449 6.20938L15.5449 9.45938C15.6919 9.60078 15.775 9.79599 15.775 10C15.775 10.204 15.6919 10.3992 15.5449 10.5406L12.0449 13.7906C11.7463 14.0777 11.2715 14.0684 10.9844 13.7698C10.6973 13.4713 10.7066 12.9965 11.0052 12.7094L13.1629 10.75H6.52502C6.11081 10.75 5.77502 10.4142 5.77502 10Z"
                                        fill="white"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="grid-cols-1">
                        <img src="/src/assets/lady.png" alt="lady" />
                    </div>
                </div>
            </div>
        </section>
    </main>

    <section class="mx-10 grid grid-cols-2 gap-5 items-end">
        <div id="hero-left" class="grid-cols-1 py-4">
            <h1
                class="mb-3"
                style="
                    color: #000;
                    font-family: Noto Sans JP;
                    font-size: 48px;
                    font-style: normal;
                    font-weight: 900;
                    line-height: normal;
                "
            >
                We're changing the way people connect.
            </h1>
            <p
                class="mb-1"
                style="
                    color: #6b7280;
                    font-family: Noto Sans JP;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: normal;
                "
            >
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt
                sunt. Qui irure qui lorem cupidatat commodo.
            </p>

            <div style="padding-top: 16px">
                <button
                    class="flex items-center"
                    style="
                        color: #fff;
                        font-family: Inter;
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 500;
                        line-height: 20px;
                        padding: 8px 16px;
                        border-radius: 6px;
                        background: #b170c3;
                        box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
                    "
                >
                    Get Started
                    <svg
                        style="width: 20px; height: 20px"
                        class="ml-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.77502 10C5.77502 9.58579 6.11081 9.25 6.52502 9.25H13.1629L11.0052 7.29063C10.7066 7.00353 10.6973 6.52875 10.9844 6.23017C11.2715 5.93159 11.7463 5.92228 12.0449 6.20938L15.5449 9.45938C15.6919 9.60078 15.775 9.79599 15.775 10C15.775 10.204 15.6919 10.3992 15.5449 10.5406L12.0449 13.7906C11.7463 14.0777 11.2715 14.0684 10.9844 13.7698C10.6973 13.4713 10.7066 12.9965 11.0052 12.7094L13.1629 10.75H6.52502C6.11081 10.75 5.77502 10.4142 5.77502 10Z"
                            fill="white"
                        />
                    </svg>
                </button>
            </div>
        </div>

        <div class="grid-cols-1">the right</div>
    </section>

    <div id="">
        <h1>header</h1>

        <p>pragraph</p>
    </div>
    <div class="mb-40">hi</div>

    <div class="relative isolate px-6 pt-14 lg:px-8">
        <!--        <div-->
        <!--            class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"-->
        <!--            aria-hidden="true"-->
        <!--        >-->
        <div
            class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style="
                clip-path: polygon(
                    74.1% 44.1%,
                    100% 61.6%,
                    97.5% 26.9%,
                    85.5% 0.1%,
                    80.7% 2%,
                    72.5% 32.5%,
                    60.2% 62.4%,
                    52.4% 68.1%,
                    47.5% 58.3%,
                    45.2% 34.5%,
                    27.5% 76.7%,
                    0.1% 64.9%,
                    17.9% 100%,
                    27.6% 76.8%,
                    76.1% 97.7%,
                    74.1% 44.1%
                );
            "
        ></div>
        <!--        </div>-->
    </div>
</template>

<style scoped>
#hero-left {
    position: relative;
    overflow: hidden;
    //background: transparent;
    //background-image: url('https://images.unsplash.com/photo-1634634465913-5bb5600942f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80');
    //transform: rotate(45deg) scale(1.45);
    //overflow: hidden;
}

#hero-left::before {
    content: '';
    position: absolute;
    width: 429.326px;
    height: 322.299px;
    z-index: -1;
    background:
        url('/src/assets/blue-bg.jpg'),
        lightgray 50% / cover no-repeat;
    transform: rotate(127.254deg);
    flex-shrink: 0;
    border-radius: 413px;
    filter: blur(117px);
}
</style>
