<!-- Please remove this file from your project -->
<template>
  <div>
    <transition name="fade" mode="out-in">
      <section>
        <transition name="content-transition">
          <Spinner v-if="loadingAllContents" />
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
                      <img
                        height="30px"
                        src="https://cdn-icons.flaticon.com/png/512/4493/premium/4493874.png?token=exp=1658273681~hmac=1ee5c379d2e5002490924465af4089ed"
                        alt=""
                        srcset=""
                      />
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
import { mapActions, mapState } from 'vuex'
export default Vue.extend({
  name: 'ListContents',

  computed: {
    ...mapState('Contents', ['allContents', 'loadingAllContents']),
  },

  created() {
    this.fetchAllContents()
  },
  methods: {
    ...mapActions('Contents', ['getAllContents']),

    async fetchAllContents() {
      await this.getAllContents()
    },
  },
})
</script>

<style lang="scss" scoped>
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

@include for-phone-only {
  section {
    article {
      overflow: auto;
      .content-container {
        width: 100%;
        .content-head {
          margin: 5px;
        }
      }
    }
  }
}
</style>
