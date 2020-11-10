<template>
    <div class="container d-md-flex justify-content-between align-items-start">
        <div class="section__image" data-image-src="/images/main.jpg"
             data-image-alt="<%= htmlWebpackPlugin.options.t('Фотография исторического лагеря') %>"
             data-dimensions="{&quot;1024&quot;: 1024, &quot;1280&quot;: 1280}">
            <img src="/images/main.jpg" alt="<%= htmlWebpackPlugin.options.t('Фотография исторического лагеря') %>" />
        </div>

        <div class="section__desc">
            <!--<p>
                <%= htmlWebpackPlugin.options.t('Русь, Скандинавия, IX-XI вв.') %><br>
                <%= htmlWebpackPlugin.options.t('Да, реконструкция, да...бесполезная?!...Мы просто делаем, что должны делать.') %><br>
                <%= htmlWebpackPlugin.options.t('Единство системы, индивидуальность личности.') %><br>
                <%= htmlWebpackPlugin.options.t('Создаём, воссоздаём, осветляем, просветляем.') %><br>
                <%= htmlWebpackPlugin.options.t('Есть цели и стремление в движении безумного вектора.') %><br>
                <%= htmlWebpackPlugin.options.t('Ты знаешь Монастырь?! Ты не куёшь и, не куя, не знаешь Монастырь...') %>
            </p>
            <p class="text-right">
                <cite><%= htmlWebpackPlugin.options.t('Если душа просит, то надо открыть') %> </cite> (c)
            </p>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "Header"
    };
</script>

<style scoped>

</style>