jQuery_T4NT(document).ready(function ($) {
    if (jnApp.dev) console.log('-> jn scripts loaded');
    /**
     *  Variant selection changed
     *  data-variant-toggle="{{variant.id}}"
     */

    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlParams = Object.fromEntries(urlSearchParams.entries());

    let app = {
        vars: {
            variantId: null,
            variantChangeCallbacks: [],
        },
        init: async () => {
            try {
                if (typeof jnApp === 'undefined') return;
                if (!jnApp) return;

                await app.locationPopup();
                await app.packageBundle.init();

                app.listenVariants();

                if (jnApp.dev) console.log('-> all apps inited');
            } catch (err) {
                console.error(err);
            }
        },
        listenVariants: () => {
            if (urlParams && urlParams.variant) {
                app.vars.variantId = urlParams.variant;
                app.setvariantPrice();
            }

            $(document).on('variant:changed', function (evt) {
                app.vars.variantId = evt.currentVariant.id;
                app.setvariantPrice();
                // $('[data-variant-toggle]').hide(0);
                // $('[data-variant-toggle="'+evt.currentVariant.id+'"]').show(0);
            });
        },
        setvariantPrice: () => {
            app.vars.variantChangeCallbacks.forEach((callback) => {
                if (typeof callback === 'function') callback(app.vars.variantId);
            });
        },
        getVariant: () => {
            try {
                let findVariant = jnApp.vars.product.data.variants.find((variant) => variant.id == app.vars.variantId);
                return findVariant;
            } catch (err) {
                return jnApp.vars.product.data;
            }
        },
        toCurrency: (amount) => {
            // let options = {
            //     amount: 0,
            //     isoCode: 'en-DE',
            //     currency: 'EUR',
            // }

            // let currency = Intl.NumberFormat(options.isoCode, {
            //     style: 'currency',
            //     currency: options.currency,
            // });

            let currency = Intl.NumberFormat(jnApp.vars.language.iso_code, {
                style: 'currency',
                currency: jnApp.vars.cart.currency,
            });

            return currency.format(amount / 100);
        },
        template: {
            init: () =>
                new Promise(async (resolve, reject) => {
                    try {
                        await app.template.canRun();
                        if (jnApp.dev) console.log(`-> template.init()`);

                        await app.template.listen();
                        await app.template.render();

                        resolve();
                    } catch (err) {
                        if (err !== 'silent') console.error(err);
                        resolve();
                    }
                }),
            canRun: () =>
                new Promise(async (resolve, reject) => {
                    try {
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                }),
            listen: () =>
                new Promise(async (resolve, reject) => {
                    try {
                        // listen stuff
                        $('xxx').on('click', function (e) {
                            e.preventDefault();
                            // do stuff
                        });

                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                }),
            render: () =>
                new Promise(async (resolve, reject) => {
                    try {
                        // render stuff

                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                }),
        },
        packageBundle: {
            init: () =>
                new Promise(async (resolve, reject) => {
                    try {
                        await app.packageBundle.canRun();
                        if (jnApp.dev) console.log(`-> packageBundle.init()`);

                        if ($('.jn-package-bundle-container').length == 0) {
                            $('.t4s-product-form__variants').append(`
                                <div class="jn-package-bundle-container"></div>
                            `);
                        }

                        app.vars.variantChangeCallbacks.push(() => {
                            let variant = app.getVariant();
                            app.packageBundle.renderInit();
                        });

                        // await app.packageBundle.renderInit();
                        await app.packageBundle.listen();

                        resolve();
                    } catch (err) {
                        if (err !== 'silent') console.error(err);
                        resolve();
                    }
                }),
            canRun: () =>
                new Promise(async (resolve, reject) => {
                    try {
                        if ($('.t4s-product__info-container').length == 0) throw 'silent';
                        if (jnApp.vars.product.packageBundleProducts.length == 0) throw 'silent';

                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                }),
            listen: () =>
                new Promise(async (resolve, reject) => {
                    try {
                        // listen stuff
                        $('.jn-package-bundle-container').on('change', '.jn-package-bundle-product-toggle', function (e) {
                            e.preventDefault();

                            app.packageBundle.renderTotals();
                        });

                        $('.jn-package-bundle-container').on('click', '.jn-package-bundle-add', async function (e) {
                            e.preventDefault();
                            try {
                                if ($(this).hasClass('button--loading')) return;

                                let items = [];

                                let quantity = 1;

                                if ($('.jn-package-bundle-quantity').length > 0 && !isNaN($('.jn-package-bundle-quantity').val())) quantity = Number($('.jn-package-bundle-quantity').val());

                                $('.jn-package-bundle-product-toggle:checked').each(function (index, $el) {
                                    items.push({
                                        // id: Number($($el).attr('data-product-id')),
                                        id: index == 0 ? app.vars.variantId : Number($($el).attr('data-variant-id')),
                                        quantity,
                                    });
                                });

                                $('.jn-package-bundle-add').addClass('button--loading');

                                let addToCartResult = await fetch(window.Shopify.routes.root + 'cart/add.js', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        items,
                                    }),
                                }).then((response) => {
                                    return response.json();
                                });

                                // console.log(addToCartResult);

                                // let addToCartUrl = `/cart/${variantIds.map((id) => `${id}:1`).join(',')}`;

                                window.location.href = `${window.Shopify.routes.root}cart`;
                            } catch (err) {
                                console.error(err);
                                $('.jn-package-bundle-add').removeClass('button--loading');
                            }
                        });

                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                }),
            renderProduct: ({ product, variant = null, index, disabled = false, addClass = '' }) => {
                // console.log({ variant });

                // if (!variant) {
                //     variant = {
                //         id: product.variants[0].id,
                //         price: product.variants[0].price,
                //         compare_at_price: product.variants[0].compare_at_price,
                //     };

                // }
                if (variant) {
                    product.price = variant.price;
                    if (variant.compare_at_price) product.compare_at_price = variant.compare_at_price;
                }

                return `
                    <${disabled ? `div` : `label`} for="jn-package-bundle-product_i_${index}" class="jn-package-bundle-product ${addClass}">
                        <div class="jn-package-bundle-product-check ${disabled ? `jn-package-bundle-product-check-disabled` : ``}">
                            <div class="checkbox-wrapper-14">
                                ${disabled ? `<i class="las la-check"></i>` : ``}
                                <input id="jn-package-bundle-product_i_${index}" type="checkbox" class="switch jn-package-bundle-product-toggle ${disabled ? 'none' : ''}" data-product-id="${
                    product.id
                }" data-variant-id="${variant ? variant.id : product.variants[0].id}" data-price="${product.price}" checked />
                            </div>
                        </div>
                        <div class="jn-package-bundle-product-image">
                            ${
                                product.featured_image
                                    ? `
                                <img src="${product.featured_image}" alt="${product.title}">
                            `
                                    : ``
                            }
                        </div>

                        <div class="jn-package-bundle-product-content">
                            <h4 class="jn-package-bundle-product-title">${product.title}</h4>
                            <div class="jn-package-bundle-product-price">
                                <!--<span class="current-price">${app.toCurrency(product.price)}</span>-->

                                <span class="jn-bundle-current-price current-price" data-already-discounted="${!!product.compare_at_price ? 1 : 0}" data-original-price="${
                    product.price
                }">${app.toCurrency(product.price)}</span>
                                ${!!product.compare_at_price ? `&nbsp;<span class="from-price">${app.toCurrency(product.compare_at_price)}</span>` : ``}

                                <!--<span class="current-price">${app.toCurrency(product.price)}</span> <span class="from-price">${app.toCurrency(product.compare_at_price)}</span>-->
                            </div>

                        </div>
                    </${disabled ? `div` : `label`}>
                `;
            },
            renderInit: () =>
                new Promise(async (resolve, reject) => {
                    try {
                        // render stuff
                        // $('.t4s-product__info-container').append(`

                        $('.jn-package-bundle-container').html(`<div class="jn-package-bundle">
                                ${
                                    jnApp.vars.product.packageBundleDiscountLabel
                                        ? `
                                <div class="jn-package-bundle-save-label">
                                    ${jnApp.vars.product.packageBundleDiscountLabel}
                                </div>
                                `
                                        : ``
                                }
                                ${
                                    jnApp.vars.product.packageBundleContent
                                        ? `
                                    <div class="jn-package-bundle-content">
                                        ${jnApp.vars.product.packageBundleContent}
                                    </div>
                                `
                                        : ``
                                }

                                <div class="jn-package-bundle-products">
                                    ${app.packageBundle.renderProduct({
                                        product: jnApp.vars.product.data,
                                        variant: app.getVariant(),
                                        index: '',
                                        disabled: true,
                                    })}

                                    <div class="jn-package-bundle-product-divider"></div>

                                    ${jnApp.vars.product.packageBundleProducts
                                        .map((product, index) =>
                                            app.packageBundle.renderProduct({
                                                product,
                                                index,
                                                addClass: 'jn-package-bundle-product-interactive',
                                            })
                                        )
                                        .join('')}
                                </div>

                                <div class="jn-package-bundle-summary"></div>

                                <div class="t4s-product-form__buttons" style="--pr-btn-round:0px;"> 
                                    <div class="t4s-d-flex t4s-flex-wrap">
                                        <div data-quantity-wrapper="" class="t4s-quantity-wrapper t4s-product-form__qty"> 
                                            <button data-quantity-selector="" data-decrease-qty="" type="button" class="t4s-quantity-selector is--minus"><svg focusable="false" class="icon icon--minus" viewBox="0 0 10 2" role="presentation"><path d="M10 0v2H0V0z" fill="currentColor"></path></svg></button>
                                            <input data-quantity-value="" type="number" class="t4s-quantity-input jn-package-bundle-quantity" step="1" min="1" max="9999" name="quantity" value="1" size="4" pattern="[0-9]*" inputmode="numeric">
                                            <button data-quantity-selector="" data-increase-qty="" type="button" class="t4s-quantity-selector is--plus"><svg focusable="false" class="icon icon--plus" viewBox="0 0 10 10" role="presentation"><path d="M6 4h4v2H6v4H4V6H0V4h4V0h2v4z" fill="currentColor" fill-rule="evenodd"></path></svg></button>
                                        </div>
                                        <button class="jn-package-bundle-add   t4s-btn t4s-btn-base t4s-btn-style-default t4s-btn-color-dark t4s-w-100 t4s-justify-content-center  t4s-btn-effect-sweep-to-top t4s-btn-loading__svg">
                                            <svg class="t4s-btn-icon" viewBox="0 0 24 24"><use xlink:href="#t4s-icon-atc"></use></svg>
                                            <div class="jn-package-bundle-totals"></div>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        `);

                        app.packageBundle.renderTotals();

                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                }),
            renderTotals: () => {
                let totalPrice = 0;
                let discountPrice = 0;
                let totalOptionsCount = $('.jn-package-bundle-product-toggle').length;
                let checkedOptionsCount = $('.jn-package-bundle-product-toggle:checked').length;
                let addDiscount = totalOptionsCount === checkedOptionsCount;

                // calc total price
                $('.jn-package-bundle-product-toggle:checked').each(function (index, $el) {
                    let price = Number($($el).attr('data-price'));

                    if (index == 0) {
                        let mainProduct = app.getVariant();
                        console.log({ mainProduct });
                        price = mainProduct.price;
                    }

                    totalPrice = totalPrice + price;
                });

                discountPrice = totalPrice;

                console.log({ discountPrice, totalPrice, addDiscount });

                if (addDiscount) {
                    if (jnApp.vars.product.packageBundleDiscountType == 'percentage') discountPrice = totalPrice * ((100 - Number(jnApp.vars.product.packageBundleDiscountAmount)) / 100);
                    if (jnApp.vars.product.packageBundleDiscountType == 'amount') discountPrice = totalPrice - Number(jnApp.vars.product.packageBundleDiscountAmount) * 100;
                    // if (jnApp.vars.product.packageBundleDiscountType == 'amount') discountPrice = totalPrice - Number('69.9') * 100;

                    let discountDiff = totalPrice - discountPrice;

                    if (discountDiff > 0) {
                        // let itemDiff = discountDiff / (checkedOptionsCount - 1);
                        let itemDiff = discountDiff / checkedOptionsCount;

                        $('.jn-bundle-current-price').each(function (index, $el) {
                            let originalItemPrice = Number($($el).attr('data-original-price'));
                            let isAlreadyDiscounted = Number($($el).attr('data-already-discounted'));

                            let newPrice = originalItemPrice - itemDiff;

                            if (isAlreadyDiscounted) {
                                $($el).html(`${app.toCurrency(newPrice)}`);

                                return;
                            }

                            $($el).html(`${app.toCurrency(newPrice)}&nbsp;<span class="from-price">${app.toCurrency(originalItemPrice)}</span>`);
                        });
                    }
                } else {
                    $('.jn-bundle-current-price').each(function (index, $el) {
                        let originalItemPrice = Number($($el).attr('data-original-price'));

                        $($el).html(`${app.toCurrency(originalItemPrice)}`);
                    });
                }

                $('.jn-package-bundle-totals').html(`
                        <div class="jn-package-bundle-totals-price">
                            ${jnApp.vars.language.jn_package_bundle.total}
                            <!--&nbsp;<span class="current-price">${app.toCurrency(discountPrice)}</span>
                            ${addDiscount ? `&nbsp;&nbsp;<span class="from-price">${app.toCurrency(totalPrice)}</span>` : ``}-->
                        </div>
                `);

                $('.jn-package-bundle-summary').html(`
                    <div class="jn-package-bundle-summary-title">${jnApp.vars.language.jn_package_bundle.summary_total}:</div>
                    <div class="jn-package-bundle-summary-content">
                        ${addDiscount ? `&nbsp;<span class="from-price">${app.toCurrency(totalPrice)}</span>` : ``}
                        <span class="current-price">${app.toCurrency(discountPrice)}</span>
                    </div>
                `);
            },
        },
        locationPopup: () =>
            new Promise((resolve, reject) => {
                try {
                    if (jnApp.dev) console.log(`-> locationPopup.init()`);

                    $(document).on('click', 'a[href="#open_location_popup"]', function (e) {
                        e.preventDefault();
                        if (!!orbito) orbito.openModal('md-app-embed__footer-popup');
                    });

                    resolve();
                } catch (err) {
                    reject(err);
                }
            }),
    };

    app.init();
});

// test
