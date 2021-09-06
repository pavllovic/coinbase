import ModalTrade from 'Components/modal/modal-trade/modal-trade.js';
import FormCoin from 'Components/form/form-coin/form-coin.js';
import FormCard from 'Components/form/form-card/form-card.js';
import validator from 'Components/form/validator/index.js';

function getTradeModal(type, Validator, validatedInputs, Form) {
  const form = Form.bind(null, Validator, validatedInputs);
  const wrap = document.getElementById(`modal-trade-${type}`);
  const select = wrap.querySelector(`#modal-types-${type}`);
  const openers = Array.from(document.querySelectorAll(`[data-modal='${type}']`));

  return new ModalTrade(wrap, select, openers, form);
}

const coin = getTradeModal('coin', validator, ['amount'], FormCoin);
const card = getTradeModal('card', validator, ['card', 'currency', 'amount'], FormCard);

export { coin, card };
