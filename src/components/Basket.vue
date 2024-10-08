<template>
  <div class="basket">
    <div class="items">

      <template v-if="productsInBag.length"> 

        <div v-for="(product, index) in productsInBag" :key="index" class="item">
                <div class="remove" @click="this.$store.dispatch('removeFromBag', product.id)">Remove item</div>
                <div class="photo">
                  <img :src="product.image"  alt="produto">
                </div>
        
                <div class="description">{{ product.title }}</div>
        
                <div class="price">          
                  <span class="quantity-area">
                    <button :disabled="product.quantity <=1" @click="product.quantity --">-</button>
        
                    <span class="quantity">{{ product.quantity }}</span>
                    <button @click="product.quantity ++">+</button>
                  </span>
        
                  <span class="amount"> R$ {{ (product.price * product.quantity).toFixed(2) }}</span>
                  
                </div>               
              </div>
              <div  class="grand-total"> Total Pedido: R$ {{ calcularTotal() }}</div> 

              <div class="finalizar">
               <button @click="finalizarCompra" class="btn-finalizar">Finalizar Compra</button>
                </div>

                          
      </template>  
      
      <template v-else>
        <h4>Não ha itens no Carrinho</h4>
      </template>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Basket',
  
  methods: {
    calcularTotal() {
      var total = 0;
      this.productsInBag.forEach(item => {
        total += item.price * item.quantity;
        
      });
      return total.toFixed(2);
    }
  },
   
    


  computed: {    
     productsInBag(){
      return this.$store.state.productsInBag;
    }
  },
}
</script>

<style lang="scss">
.basket {
  padding: 60px 0;

  .items {
    max-width: 800px;
    margin: auto;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 40px 0;
      border-bottom: 1px solid lightgrey;
      position: relative;

      .remove {
        position: absolute;
        top: 8px;
        right: 0;
        font-size: 11px;
        text-decoration: underline;
        cursor: pointer;
      }

      .quantity-area {
        display: flex;
        align-items: center;
        margin: 8px auto;

        button {
          width: 24px;
          height: 24px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          background-color: #007bff;
          border: none;
          color: #fff;
          font-size: 16px;
          line-height: 16px;
          border-radius: 50%;

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
        }

        .quantity {
          margin: 0 8px;
          font-size: 16px;
          line-height: 24px;
        }
      }

      .photo {
        img {
          max-width: 80px;
        }
      }

      .description {
        padding-left: 30px;
        box-sizing: border-box;
        max-width: 50%;
        font-size: 14px;
      }

      .price {
        display: flex;
        align-items: center;

        .amount {
          font-size: 16px;
          margin-left: 8px;
          vertical-align: middle;
        }
      }
    }

    .grand-total {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-top: 8px;
    }

    .finalizar {
      text-align: center;
      margin-top: 20px;

      .btn-finalizar {
        padding: 12px 24px;
        background-color: #28a745;
        border: none;
        color: white;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #023b0f;
        }
      }
    }
  }
}
</style>
