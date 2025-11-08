#!/usr/bin/env ts-node

import { getDb } from '../db/index';

async function printDatabase() {
  console.log('🔍 DATABASE CONTENTS VIEWER\n');
  console.log('='.repeat(50));
  
  try {
    const db = getDb();
    
    // Get all tables
    const tables = ['users', 'vendors', 'products', 'projects', 'project_items', 'cart_items'];
    
    for (const table of tables) {
      console.log(`\n📋 TABLE: ${table.toUpperCase()}`);
      console.log('-'.repeat(30));
      
      const result = await db.query(`SELECT * FROM ${table}`);
      
      if (result.rows.length === 0) {
        console.log('   (empty table)');
      } else {
        console.log(`   Records: ${result.rowCount}`);
        console.table(result.rows);
      }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Database inspection complete!');
    
  } catch (error) {
    console.error('❌ Error reading database:', error);
  } finally {
    process.exit(0);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  printDatabase();
}