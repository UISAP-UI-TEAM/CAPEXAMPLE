module.exports = (srv) => {
    const { Books,Authors } = cds.entities('my.bookshop')
    // Reduce stock of ordered books
    srv.before('CREATE', 'Books', async (req) => {
        const newBook = req.data;

        // Stok miktarı kontrolü
        if (!newBook.stock || newBook.stock < 1) {
            return req.error(400, 'Kitap stoğu en az 1 olmalıdır.');
        }

        // Kitap adı kontrolü
        if (!newBook.title) {
            return req.error(400, 'Kitap adı gereklidir.');
        }

        // Yazarın olup olmadığını kontrol et
        if (!newBook.author_ID) {
            return req.error(400, 'Bir yazar seçmelisiniz.');
        }

        // Yazarın mevcut olup olmadığını kontrol et
        // const authorExists = await cds.transaction(req).run(
        //     SELECT.from(Authors).where({ ID: newBook.author_ID })
        // );

        // if (authorExists.length === 0) {
        //     return req.error(404, 'Belirtilen yazar bulunamadı.');
        // }
    });
    srv.before('CREATE', 'Orders', async (req) => {
        const order = req.data
        console.log(req.data);
        debugger
        if (!order.amount || order.amount <= 0) return req.error(400, 'Order at least 1 book')
        const tx = cds.transaction(req)
        const affectedRows = await tx.run(
            UPDATE(Books)
                .set({ stock: { '-=': order.amount } })
                .where({ stock: { '>=': order.amount },/*and*/ ID: order.book_ID })
        )
        if (affectedRows === 0) req.error(409, "Sold out, sorry")
    })

    // Add some discount for overstocked books
    // srv.after('READ', 'Books', each => {
    //     if (each.stock > 111) each.title += ' -- 11% discount!'
    // })

}