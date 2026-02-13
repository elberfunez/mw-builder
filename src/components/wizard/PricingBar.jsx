import { calcPrice } from '../../constants/pricing'

export default function PricingBar({
  config,
  step,
  nextLabel,
  onPrev,
  onNext,
  onSave,
  onBuyNow,
  onAddToCart,
}) {
  const { total, deposit } = calcPrice(config)

  return (
    <div className="mw-pricing-bar">
      <div className="mw-pricing-bar__amounts">
        <span className="mw-pricing-bar__label">Live Price</span>
        <span key={total} className="mw-pricing-bar__total mw-pricing-bar__total--animated">
          ${total.toLocaleString()}
        </span>
        <span className="mw-pricing-bar__deposit">Deposit to Order ${deposit.toLocaleString()}</span>
      </div>

      <div className="mw-pricing-bar__actions">
        {step > 1 && (
          <button className="mw-pricing-bar__btn mw-pricing-bar__btn--secondary" onClick={onPrev} type="button">
            Back
          </button>
        )}

        {step < 3 && (
          <button className="mw-pricing-bar__btn mw-pricing-bar__btn--primary" onClick={onNext} type="button">
            Next: {nextLabel}
          </button>
        )}

        {step === 3 && (
          <button className="mw-pricing-bar__btn mw-pricing-bar__btn--primary" onClick={onBuyNow} type="button">
            Buy Now
          </button>
        )}

        <button className="mw-pricing-bar__btn mw-pricing-bar__btn--ghost" onClick={onAddToCart} type="button">
          Add to Cart
        </button>
        <button className="mw-pricing-bar__btn mw-pricing-bar__btn--ghost" onClick={onSave} type="button">
          Save
        </button>
      </div>
    </div>
  )
}
