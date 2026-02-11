import { calcPrice } from '../../constants/pricing'

export default function PricingBar({ config, onSave, onBuyNow, onAddToCart }) {
  const { total, deposit } = calcPrice(config)
  return (
    <div className="mw-pricing-bar">
      <div className="mw-pricing-bar__amounts">
        <span className="mw-pricing-bar__total">${total.toLocaleString()}</span>
        <span className="mw-pricing-bar__deposit">
          Deposit to Order: ${deposit.toLocaleString()}
        </span>
      </div>
      <div className="mw-pricing-bar__actions">
        <button
          className="mw-pricing-bar__btn mw-pricing-bar__btn--save"
          onClick={onSave}
          type="button"
        >
          Save
        </button>
        <button
          className="mw-pricing-bar__btn mw-pricing-bar__btn--buy"
          onClick={onBuyNow}
          type="button"
        >
          Buy Now
        </button>
        <button
          className="mw-pricing-bar__btn mw-pricing-bar__btn--cart"
          onClick={onAddToCart}
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
