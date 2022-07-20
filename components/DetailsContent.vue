<!-- Please remove this file from your project -->
<template>
  <div>
    <transition name="fade" mode="out-in">
      <section>
        <transition name="content-transition">
          <Spinner v-if="loadingContent" />
          <article v-else class="content-container">
            <div class="content-header">
              <div class="content-header-icon">
                <NuxtLink to="/content" style="" class="button-back">
                  <img
                    src="~/assets/images/arrow-back.gif"
                    alt="Seta branca com animação, apontando para esquerda, utilizada para voltar para a tela de listagem"
                    srcset=""
                  />
                </NuxtLink>
              </div>
              <div class="content-header-text">
                <p class="fw-300">Conteúdo</p>
              </div>

              <div class="content-header-search">
                <img
                  src="~/assets/images/search.gif"
                  alt="Lupa branca com animação, utilizada para pesquisar sobre o assunto listado"
                />

                <a class="search-link" @click="searchAbout"
                  >Mais conteúdo sobre o assunto</a
                >
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
                    <img
                      :src="content.url"
                      alt="imagem referente ao conteudo"
                    />
                  </div>
                  <div
                    v-else-if="
                      content.type === 'link' || content.type === 'document'
                    "
                    class="content-link"
                  >
                    <img
                      src="~/assets/images/navigation.webp"
                      alt="imagem demonstrando pessoas conectadas a internet de varias formas, todas em torno de um globo que é análogo a internet"
                    />
                    <span class="link" @click="navigate">Visitar Site </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-footer">
              <p class="fw-300">{{ dataCreated }}</p>
              <p class="fw-300">{{ dataUpdated }}</p>
            </div>
          </article>
        </transition>
      </section>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapState, mapGetters } from 'vuex'
import { IContent } from '~/common/types/content'

export default Vue.extend({
  name: 'DetailsS',
  data() {
    return {
      content: {} as IContent,
    }
  },

  computed: {
    ...mapState('Contents', ['loadingContent']),
    ...mapGetters('Contents', ['contentGetter']),

    embedUrlYoutube(): string {
      return this.content.url.replace('watch?v=', 'embed/')
    },

    hasDescription(): boolean {
      return this.content.description !== ''
    },

    dataCreated(): string {
      const date = new Date(this.content.created_at)
      const day = this.addZero(date.getDay())
      const month = this.addZero(date.getMonth())
      const year = this.addZero(date.getFullYear())

      const data = day + '/' + month + '/' + year
      return 'Conteúdo criado em : ' + data
    },

    dataUpdated(): string {
      if (!this.content.updated_at) return 'Conteúdo não atualizado'
      const date = new Date(this.content.updated_at)
      const day = this.addZero(date.getDay())
      const month = this.addZero(date.getMonth())
      const year = this.addZero(date.getFullYear())

      const data = day + '/' + month + '/' + year
      return 'Conteúdo atualizado em : ' + data
    },

    hasEmbeddable(): boolean {
      if (this.content.embeddable === false && this.content.url === null)
        return false
      return true
    },
  },
  created() {
    this.fetchContentId()
  },

  methods: {
    ...mapActions('Contents', ['getContentId']),

    searchAbout() {
      window.open(
        'https://www.google.com/search?q=' + this.content.title,
        '_blank'
      )
    },

    addZero(dataNumber: number) {
      return dataNumber < 10 ? '0' + dataNumber : dataNumber
    },

    async fetchContentId() {
      await this.getContentId(this.$route.params.id)
      this.content = this.contentGetter
    },

    navigate() {
      window.open(this.content.url, '_blank')
    },
  },
})
</script>

<style lang="scss" scoped>
.content-footer {
  background: #00d2ff;
  background: -webkit-linear-gradient(to left, #3a7bd5, #00d2ff);
  background: linear-gradient(to left, #3a7bd5, #00d2ff);
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(black, 0.16), 0 3px 6px rgba(black, 0.23);
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
  width: 100%;

  p {
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

    .content-header {
      background: #00d2ff;
      background: -webkit-linear-gradient(to left, #3a7bd5, #00d2ff);
      background: linear-gradient(to left, #3a7bd5, #00d2ff);
      border-radius: 10px;
      box-shadow: 0 3px 6px rgba(black, 0.16), 0 3px 6px rgba(black, 0.23);
      display: flex;
      margin-bottom: 10px;

      .content-header-icon {
        width: 33%;
        display: flex;
        align-items: center;
        img {
          height: 50px;
          transition: all 0.5s;
          transform: rotate(180deg);
        }
      }

      .content-header-text {
        display: flex;
        justify-content: center;
        width: 33%;
        font-size: 18px;
      }

      .content-header-search {
        display: flex;
        font-size: 15px;
        justify-content: center;
        align-items: center;
        color: #fff;
        width: 33%;

        .search-link {
          cursor: pointer;
        }

        img {
          height: 28px;
          margin-right: 5px;
        }
      }

      .button-back {
        font-size: 30px;
        display: flex;
        align-self: center;
        margin-left: 10px;
      }

      p {
        padding: 5px 20px;
        margin: 10px;
        color: #ffff;
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
            transition: all 0.5s;
            &:hover {
              color: #2b66b9;
              font-size: 18px;
            }
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
}

@include for-phone-only {
  section {
    .content-container {
      overflow: auto;
      width: 95%;
      .content-header {
        .content-header-icon {
          width: 15%;
          img {
            height: 35px;
          }
        }

        .content-header-text {
          display: none;
        }

        .content-header-search {
          display: flex;
          justify-content: center;
          width: 67%;
          font-size: 13px;
          img {
            height: 17px;
          }
        }
        p {
          font-size: 17px;
          padding: 3px;
          margin: 5px;
        }
      }

      .content-data-container {
        flex-direction: column;
        width: 100%;
        /* height: 'auto'; */

        .content-data-description {
          width: 100%;
          height: 50%;
        }

        .content-data-embeddable {
          width: 100%;
          height: 50%;

          .content-image {
            width: 80%;
            height: 300px;
            margin-top: -50px;
          }

          .content-iframe {
            height: 300px;
            iframe {
              width: 90%;
              height: 90%;
            }
          }
        }
      }
    }
  }
}
</style>
