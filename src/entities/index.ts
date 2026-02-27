/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: hairextensions
 * @catalog This collection is an eCommerce catalog
 * Interface for HairExtensionsandWigs
 */
export interface HairExtensionsandWigs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  itemName?: string;
  /** @wixFieldType number */
  itemPrice?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  itemImage?: string;
  /** @wixFieldType text */
  itemDescription?: string;
  /** @wixFieldType text */
  productType?: string;
  /** @wixFieldType text */
  color?: string;
  /** @wixFieldType number */
  length?: number;
}
