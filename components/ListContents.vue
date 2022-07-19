<!-- Please remove this file from your project -->
<template>
  <div>
    <transition name="fade" mode="out-in">
      <section>
        <transition name="content-transition">
          <Spinner v-if="loading" />
          <article v-else>
            <div class="content-container">
              <div class="content-head">
                <p>Lista de Conteúdos</p>
              </div>

              <div class="content-body">
                <div
                  v-for="content in allContents"
                  :key="content.id"
                  class="content-item hover"
                >
                  <NuxtLink :to="'/content/' + content.id">
                    <span> {{ content.title }}</span>
                    <span class="icon is-left">
                      <font-awesome-icon :icon="['fa', 'arrow-right']" />
                    </span>
                    <i class="fa fa-angle-right"></i>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </article>
        </transition>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { IContent } from '~/services/contents'
import mymodule from '~/store/Contents'
export default Vue.extend({
  name: 'ListContents',
  data() {
    return {
      allContents: [] as IContent[],
    }
  },

  computed: {
    loading(): boolean {
      return getModule(mymodule, this.$store).loadingAllContents
    },
  },

  created() {
    this.fetchAllContents()
  },
  methods: {
    async fetchAllContents() {
      await getModule(mymodule, this.$store).getAllContents()
      this.allContents = getModule(mymodule, this.$store).allContents
    },
  },
})
</script>

<style lang="scss" scoped>
.content-transition-enter-active,
.content-transition-leave-active {
  transition: opacity 0.8s;
}
.content-transition-enter,
.content-transition-leave-active {
  opacity: 0;
}

section {
  display: flex;
  justify-content: center;
  height: 80vh;

  article {
    width: 100%;
    display: flex;
    margin-top: 50px;
    justify-content: center;
    height: 70vh;

    .content-container {
      width: 70%;

      .content-head {
        background: #00d2ff;
        background: -webkit-linear-gradient(to left, #3a7bd5, #00d2ff);
        background: linear-gradient(to left, #3a7bd5, #00d2ff);
        border-radius: 10px;

        p {
          padding: 5px 20px;
          margin: 10px;
          color: #ffff;
          font-size: 20px;
          text-align: center;
        }
      }

      .content-body {
        padding: 10px;
        margin: 10px;
        display: grid;
        grid-gap: 10px;

        .content-item {
          a {
            padding: 25px;
            padding-right: 0px;
            display: grid;
            grid-template-columns: 10fr 1fr;
            color: #0b59a2ea;
            font-size: 15px;
            border: 1px solid transparent;
            cursor: pointer;
            text-decoration: none;
          }

          &:hover {
            border-radius: 10px;
            background-color: #0b59a279;
            color: #fff;
          }

          .icon {
            font-size: 15px;
            color: #0b5aa2;
            font-weight: bold;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin: 0 10px;
          }
        }
      }
    }
  }
}

.hover {
  color: #fff;
  border-radius: 10px;

  background: linear-gradient(90deg, rgba(236, 236, 236, 0.616) 50%, #fff 0)
    var(--_p, 100%) / 200% no-repeat;

  transition: 0.6s;
}
.hover:hover {
  --_p: 0%;
}
</style>
