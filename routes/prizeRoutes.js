const express = require('express');
const router = express.Router();
const prizeController = require('../controller/prizeController');
const { authenticate, isAdmin } = require('../middleware/auth');


/**
 * @openapi
 * /prizes/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Prizes
 *     summary: Adds a new prize
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               year:
 *                  type: integer
 *               description:
 *                  type: string
 *     responses:
 *       200:
 *         description: Prize added successfully
 *       403:
 *         description: Authorization required
 */
router.post('/', authenticate, isAdmin, prizeController.addPrize);


/**
 * @openapi
 * /prizes/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Prizes
 *     summary: Deletes a prize
 *     description: This route allows admins to delete a prize.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the prize to delete
 *     responses:
 *       200:
 *         description: Prize deleted successfully
 *       404:
 *         description: Prize not found
 *       403:
 *         description: Authorization required
 */

router.delete('/:id', authenticate, isAdmin, prizeController.deletePrize);

/**
 * @openapi
 * /prizes/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Prizes
 *     summary: Updates a prize
 *     description: This route allows admins to update details of a prize.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               year:
 *                  type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Prize updated successfully
 *       404:
 *         description: prze not found
 *       403:
 *         description: Authorization required
 */
router.put('/:id', authenticate, isAdmin, prizeController.updatePrize);

module.exports = router;