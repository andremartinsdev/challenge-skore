<!-- Please remove this file from your project -->
<template>
  <div>
    <transition name="fade" mode="out-in">
      <section>
        <transition name="content-transition">
          <Spinner v-if="loading" />
          <article v-else class="content-container">
            <div class="content-head">
              <NuxtLink
                to="/content"
                style="
                  width: 44%;
                  font-size: 30px;
                  display: flex;
                  align-self: center;
                  margin-left: 10px;
                "
              >
                <span class="icon is-left">
                  <font-awesome-icon
                    :icon="['fa', 'circle-arrow-left']"
                    style="color: #0a5ccf"
                  />
                </span>
              </NuxtLink>
              <div
                style="width: 50%; display: flex; justify-content: flext-start"
              >
                <p class="fw-300">Conteúdo</p>
              </div>
            </div>
            <div class="content-body">
              <div>
                <h1>{{ content.title }}</h1>
              </div>
              <div class="content-data-container">
                <div v-if="hasDescription" class="content-data-description">
                  <p>{{ content.description }}</p>
                </div>
                <div v-if="hasEmbeddable" class="content-data-embeddable">
                  <div v-if="content.type === 'video'" class="content-iframe">
                    <iframe :src="embedUrlYoutube"> </iframe>
                  </div>
                  <div
                    v-else-if="content.type === 'image'"
                    class="content-image"
                  >
                    <img :src="content.url" alt="" />
                  </div>
                  <div
                    v-else-if="
                      content.type === 'link' || content.type === 'document'
                    "
                    class="content-link"
                  >
                    <img src="~/assets/images/navigation.webp" alt="" />
                    <span class="link" @click="navigate"
                      >Visitar Site
                      <span class="icon is-left">
                        <font-awesome-icon :icon="['fa', 'arrow-pointer']" />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-footer">
              <NuxtLink
                to="/content"
                style="
                  width: 44%;
                  font-size: 30px;
                  display: flex;
                  align-self: center;
                  margin-left: 10px;
                "
              >
              </NuxtLink>
              <div
                style="width: 50%; display: flex; justify-content: flext-start"
              >
                <p class="fw-300">{{ convertTimestamp }}</p>
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
  name: 'DetailsS',
  data() {
    return {
      content: {} as IContent,
    }
  },

  computed: {
    embedUrlYoutube(): string {
      return this.content.url.replace('watch?v=', 'embed/')
    },

    hasDescription(): boolean {
      return this.content.description !== ''
    },

    loading(): boolean {
      return getModule(mymodule, this.$store).loadingContent
    },

    convertTimestamp(): string {
      const date = new Date(this.content.created_at)
      const day = this.addZero(date.getDay())
      const month = this.addZero(date.getMonth())
      const year = this.addZero(date.getFullYear())

      const data = day + '/' + month + '/' + year
      return data
    },

    hasEmbeddable(): boolean {
      if (this.content.embeddable === false && this.content.url === null)
        return false
      return true
    },
  },
  created() {
    this.getvideo()
  },

  methods: {
    addZero(dataNumber: number) {
      return dataNumber < 10 ? '0' + dataNumber : dataNumber
    },

    async getvideo() {
      await getModule(mymodule, this.$store).getContentId(this.$route.params.id)
      this.content = getModule(mymodule, this.$store).content
    },

    navigate() {
      window.open(this.content.url, '_blank')
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

.content-footer {
  background: #00d2ff;
  background: -webkit-linear-gradient(to left, #3a7bd5, #00d2ff);
  background: linear-gradient(to left, #3a7bd5, #00d2ff);
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(black, 0.16), 0 3px 6px rgba(black, 0.23);
  display: flex;
  margin-top: 10px;

  p {
    padding: 5px 20px;
    margin: 10px;
    color: #ffff;
    font-size: 15px;
    text-align: center;
  }
}

section {
  display: flex;
  justify-content: center;
  height: 'auto';

  .content-container {
    width: 80%;
    border-radius: 10px;

    .content-head {
      background: #00d2ff;
      background: -webkit-linear-gradient(to left, #3a7bd5, #00d2ff);
      background: linear-gradient(to left, #3a7bd5, #00d2ff);
      border-radius: 10px;
      box-shadow: 0 3px 6px rgba(black, 0.16), 0 3px 6px rgba(black, 0.23);
      display: flex;
      margin-bottom: 10px;

      p {
        padding: 5px 20px;
        margin: 10px;
        color: #ffff;
        font-size: 20px;
        text-align: center;
      }
    }

    .content-body {
      height: 65vh;
      max-height: 80vh;
      min-height: 400px;
      background: $sec;
      border-radius: 10px;
      padding: 5px;
      overflow: auto;
      box-shadow: 0 3px 6px rgba(black, 0.16), 0 3px 6px rgba(black, 0.23);

      h1 {
        text-align: center;
        color: #444;
      }

      .content-data-description {
        width: 50%;
        height: 90%;
        max-height: 60vh;
        overflow: auto;

        p {
          font-size: 14px;
          padding: 0 20px;
        }
      }
    }

    .content-data-container {
      display: flex;
      justify-content: space-around;
      height: 85%;

      .content-data-embeddable {
        width: 50%;
        display: flex;
        justify-content: center;

        .content-iframe {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          iframe {
            width: 90%;
            height: 90%;
          }
        }

        .content-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #3a7bd5;

          .link {
            cursor: pointer;
          }
          span .icon {
            margin-left: 10px;
            transition: all 0.5s;
          }

          img {
            width: 65%;
          }

          span:hover {
            .icon {
              color: #00d2ff;
            }
          }
        }

        .content-image {
          display: flex;
          justify-content: center;

          img {
            width: 90%;
            height: 90%;
          }
        }
      }
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #3a7bd5;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgb(107, 107, 107);
  }
}
</style>
