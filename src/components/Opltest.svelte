<script lang="ts">
    import {
        Button,
        ButtonGroup,
        Card,
        Dropdown,
        DropdownItem,
        DropdownDivider,
        DropdownHeader,
        P
    } from "flowbite-svelte";
    import {
        ChevronDownOutline,
        PlayOutline,
        PauseOutline,
        StopOutline,
    } from "flowbite-svelte-icons";

    import TextMatrix from "./TextMatrix.svelte";
    // This component should be hydrated
    import { onMount } from "svelte";

    //let textMatrixInstance: any;

    let player: any = $state(null);
    let counter = $state("");
    let isOpen = $state(false);

    const fileOptions = [
        { label: "title.raw", value: "/music/title.raw" },
        { label: "aditup_1.rad", value: "/music/aditup_1.rad" },
        { label: "aditup_2.rad", value: "/music/aditup_2.rad" },
    ];

    function FileToArrayBuffer(file: File): Promise<ArrayBuffer> {
        const fileReader = new FileReader();

        return new Promise((resolve, reject) => {
            fileReader.onerror = () => {
                fileReader.abort();
                reject(new Error('Problem parsing input file'))
            };

            fileReader.onload = () => {
                resolve(fileReader.result as ArrayBuffer);
            };

            fileReader.readAsArrayBuffer(file);
        });
    }

    async function loadFile(files: FileList) {
        if (files instanceof FileList && files.length) {
            var file = files[0];
            var data = await FileToArrayBuffer(file);

            player.play(data);
        }
    }

    async function loadAndPlay(url: string) {
        let data: ArrayBuffer;

        try {
            data = await fetch(url).then((response) => response.arrayBuffer());

            player.play(data);
        } catch (error) {

        }
    }

    onMount(() => {
        player = new (window as any).OPL3.Player(null, { prebuffer: 3000, volume: 4 });

        player.on("currentTime", (value: any) => {
            counter = `currentFrame: ${value.currentFrame}, currentTime: ${value.currentTime.toFixed(2)} s`;
        })

        //textMatrixInstance.printAscii(0, 5, "From outside");
    });
</script>

<!-- svelte:head is not picked up by Astro correctly, inject scripts inside page.astro component -->
<!--svelte:head>
    <script id="opl3" type="text/javascript" src="/js/opl3.js"></script>
</svelte:head-->

<style>
    a {
        color: blue;
        text-decoration: underline;
    }
</style>

<section class="max-w-3xl mx-auto d-flex flex-row">
    <div>
        <h2>OPL3 emulation test</h2>
        <P size="lg">This is a demo of heavily modified <a href="https://github.com/doomjs/opl3">Doomjs's OPL3 emulation engine.</a></P>

        <Card class="p-4 sm:p-6 md:p-8">
            <div class="flex flex-col items-start gap-[8px]">
                <Button>Choose file<ChevronDownOutline class="ms-2 h-6 w-6 text-white dark:text-white" /></Button>
                <Dropdown bind:isOpen simple>
                    {#each fileOptions as option }
                        <DropdownItem
                            class="w-full text-left"
                            onclick={(e: Event) => { loadAndPlay(option.value); isOpen = false; }}
                        >
                            {option.label}
                        </DropdownItem>
                    {/each}
                </Dropdown>

                <!--<div>
                    <label for="fileUpload">Select a file:</label>
                    <input type="file" id="fileUpload" name="fileUpload"
                        accept=".rad,.raw,.dro,.laa,.mus,.imf"
                        onchange={(e: Event) => loadFile((e.target as any).files)}
                    >
                </div>-->

                <ButtonGroup class="*:ring-primary-700!">
                    <Button onclick={() => player.stop()}><StopOutline class="me-2 h-4 w-4" />Stop</Button>
                    <Button onclick={() => player.pause()}><PauseOutline class="me-2 h-4 w-4" />Pause</Button>
                    <Button onclick={() => player.resume()}><PlayOutline class="me-2 h-4 w-4" />Resume</Button>
                </ButtonGroup>
            </div>

            <div>{counter}</div>
        </Card>
    </div>

    <!--<TextMatrix width={36} height={10} bind:this={textMatrixInstance}/>-->
</section>
