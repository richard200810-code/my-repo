/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: customers
 * Interface for Customers
 */
export interface Customers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  companyName?: string;
  /** @wixFieldType text */
  contactPerson?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  whatsAppNumber?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  source?: string;
  /** @wixFieldType text */
  customerType?: string;
  /** @wixFieldType text */
  salesStage?: string;
  /** @wixFieldType text */
  owner?: string;
  /** @wixFieldType text */
  notes?: string;
  /** @wixFieldType date */
  nextFollowUpDate?: Date | string;
  /** @wixFieldType text */
  createdBy?: string;
}


/**
 * Collection ID: followups
 * Interface for CustomerFollowups
 */
export interface CustomerFollowups {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  customerIdentifier?: string;
  /** @wixFieldType text */
  followUpAction?: string;
  /** @wixFieldType datetime */
  followUpDate?: Date | string;
  /** @wixFieldType datetime */
  nextActionDate?: Date | string;
  /** @wixFieldType text */
  notes?: string;
  /** @wixFieldType text */
  createdBy?: string;
}


/**
 * Collection ID: hairextensions
 * @catalog This collection is an eCommerce catalog
 * Interface for HairExtensionsandWigs
 */
export interface HairExtensionsandWigs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  weightInGrams?: number;
  /** @wixFieldType text */
  keywords?: string;
  /** @wixFieldType text */
  careInstructions?: string;
  /** @wixFieldType number */
  quantityInPack?: number;
  /** @wixFieldType text */
  applicationMethod?: string;
  /** @wixFieldType text */
  storeId?: string;
  /** @wixFieldType text */
  texture?: string;
  /** @wixFieldType text */
  hairType?: string;
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


/**
 * Collection ID: stores
 * Interface for Stores
 */
export interface Stores {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  storeName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  storeImage?: string;
  /** @wixFieldType text */
  ownerContactName?: string;
  /** @wixFieldType text */
  ownerContactEmail?: string;
}
