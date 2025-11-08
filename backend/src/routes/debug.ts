import { getDb } from '../db/index';
import { Request, Response } from 'express';

/**
 * Debug route to display all database contents
 */
export async function getAllData(req: Request, res: Response) {
  try {
    const db = getDb();
    
    // Get all table data
    const users = await db.query('SELECT * FROM users');
    const vendors = await db.query('SELECT * FROM vendors');
    const products = await db.query('SELECT * FROM products');
    const projects = await db.query('SELECT * FROM projects');
    const projectItems = await db.query('SELECT * FROM project_items');
    const cartItems = await db.query('SELECT * FROM cart_items');

    const dbContents = {
      users: users.rows,
      vendors: vendors.rows,
      products: products.rows,
      projects: projects.rows,
      project_items: projectItems.rows,
      cart_items: cartItems.rows,
      metadata: {
        timestamp: new Date().toISOString(),
        total_tables: 6,
        total_records: {
          users: users.rowCount,
          vendors: vendors.rowCount,
          products: products.rowCount,
          projects: projects.rowCount,
          project_items: projectItems.rowCount,
          cart_items: cartItems.rowCount
        }
      }
    };

    res.status(200).json(dbContents);
  } catch (error) {
    console.error('Database debug error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch database contents',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Debug route to get specific table data
 */
export async function getTableData(req: Request, res: Response) {
  try {
    const { table } = req.params;
    const allowedTables = ['users', 'vendors', 'products', 'projects', 'project_items', 'cart_items'];
    
    if (!table || !allowedTables.includes(table)) {
      return res.status(400).json({ 
        error: 'Invalid table name',
        allowed_tables: allowedTables
      });
    }

    const db = getDb();
    const result = await db.query(`SELECT * FROM ${table}`);
    
    res.status(200).json({
      table: table,
      data: result.rows,
      count: result.rowCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Table data error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch table data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}