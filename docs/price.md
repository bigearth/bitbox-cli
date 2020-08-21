# Price

### `current`

Return current price of BCH in multiple currencies

#### Arguments

1.  currency `string` **optional**: Defaults to usd

Valid currencies

aed, afn, all, amd, ang, aoa, ars, aud, awg, azn, bam, bbd, bdt, bgn, bhd, bif, bmd, bnd, bob, brl, bsd, btn, bwp, byn, bzd, cad, cdf, chf, clf, clp, cnh, cny, cop, crc, cuc, cup, cve, czk, djf, dkk, dop, dzd, egp, ern, etb, eur, fjd, fkp, gbp, gel, ggp, ghs, gip, gmd, gnf, gtq, gyd, hkd, hnl, hrk, htg, huf, idr, ils, imp, inr, iqd, irr, isk, jep, jmd, jod, jpy, kes, kgs, khr, kmf, kpw, krw, kwd, kyd, kzt, lak, lbp, lkr, lrd, lsl, lyd, mad, mdl, mga, mkd, mmk, mnt, mop, mro, mur, mvr, mwk, mxn, myr, mzn, nad, ngn, nio, nok, npr, nzd, omr, pab, pen, pgk, php, pkr, pln, pyg, qar, ron, rsd, rub, rwf, sar, sbd, scr, sdg, sek, sgd, shp, sll, sos, srd, ssp, std, svc, syp, szl, thb, tjs, tmt, tnd, top, try, ttd, twd, tzs, uah, ugx, usd, uyu, uzs, vef, vnd, vuv, wst, xaf, xag, xau, xcd, xdr, xof, xpd, xpf, xpt, yer, zar, zmw, zwl

#### Result

price `Promise<number>`: Price of single requested currency

#### Examples

    (async () => {
      try {
        let current = await bitbox.Price.current('usd');
        console.log(current);
      } catch(error) {
       console.error(error)
      }
    })()

    // 26681
