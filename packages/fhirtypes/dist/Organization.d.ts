/*
 * This is a generated file
 * Do not edit manually.
 */

import { Address } from './Address';
import { CodeableConcept } from './CodeableConcept';
import { ContactPoint } from './ContactPoint';
import { Endpoint } from './Endpoint';
import { Extension } from './Extension';
import { HumanName } from './HumanName';
import { Identifier } from './Identifier';
import { Meta } from './Meta';
import { Narrative } from './Narrative';
import { Reference } from './Reference';
import { Resource } from './Resource';

/**
 * A formally or informally recognized grouping of people or
 * organizations formed for the purpose of achieving some form of
 * collective action.  Includes companies, institutions, corporations,
 * departments, community groups, healthcare practice groups,
 * payer/insurer, etc.
 */
export interface Organization {

  /**
   * This is a Organization resource
   */
  readonly resourceType: 'Organization';

  /**
   * The logical id of the resource, as used in the URL for the resource.
   * Once assigned, this value never changes.
   */
  id?: string;

  /**
   * The metadata about the resource. This is content that is maintained by
   * the infrastructure. Changes to the content might not always be
   * associated with version changes to the resource.
   */
  meta?: Meta;

  /**
   * A reference to a set of rules that were followed when the resource was
   * constructed, and which must be understood when processing the content.
   * Often, this is a reference to an implementation guide that defines the
   * special rules along with other profiles etc.
   */
  implicitRules?: string;

  /**
   * The base language in which the resource is written.
   */
  language?: string;

  /**
   * A human-readable narrative that contains a summary of the resource and
   * can be used to represent the content of the resource to a human. The
   * narrative need not encode all the structured data, but is required to
   * contain sufficient detail to make it &quot;clinically safe&quot; for a human to
   * just read the narrative. Resource definitions may define what content
   * should be represented in the narrative to ensure clinical safety.
   */
  text?: Narrative;

  /**
   * These resources do not have an independent existence apart from the
   * resource that contains them - they cannot be identified independently,
   * and nor can they have their own independent transaction scope.
   */
  contained?: Resource[];

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the resource. To make the use of extensions
   * safe and manageable, there is a strict set of governance  applied to
   * the definition and use of extensions. Though any implementer can
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension.
   */
  extension?: Extension[];

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the resource and that modifies the
   * understanding of the element that contains it and/or the understanding
   * of the containing element's descendants. Usually modifier elements
   * provide negation or qualification. To make the use of extensions safe
   * and manageable, there is a strict set of governance applied to the
   * definition and use of extensions. Though any implementer is allowed to
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension. Applications processing a
   * resource are required to check for modifier extensions.
   *
   * Modifier extensions SHALL NOT change the meaning of any elements on
   * Resource or DomainResource (including cannot change the meaning of
   * modifierExtension itself).
   */
  modifierExtension?: Extension[];

  /**
   * Identifier for the organization that is used to identify the
   * organization across multiple disparate systems.
   */
  identifier?: Identifier[];

  /**
   * Whether the organization's record is still in active use.
   */
  active?: boolean;

  /**
   * The kind(s) of organization that this is.
   */
  type?: CodeableConcept[];

  /**
   * A name associated with the organization.
   */
  name?: string;

  /**
   * A list of alternate names that the organization is known as, or was
   * known as in the past.
   */
  alias?: string[];

  /**
   * A contact detail for the organization.
   */
  telecom?: ContactPoint[];

  /**
   * An address for the organization.
   */
  address?: Address[];

  /**
   * The organization of which this organization forms a part.
   */
  partOf?: Reference<Organization>;

  /**
   * Contact for the organization for a certain purpose.
   */
  contact?: OrganizationContact[];

  /**
   * Technical endpoints providing access to services operated for the
   * organization.
   */
  endpoint?: Reference<Endpoint>[];
}

/**
 * Contact for the organization for a certain purpose.
 */
export interface OrganizationContact {

  /**
   * Unique id for the element within a resource (for internal references).
   * This may be any string value that does not contain spaces.
   */
  id?: string;

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element. To make the use of extensions
   * safe and manageable, there is a strict set of governance  applied to
   * the definition and use of extensions. Though any implementer can
   * define an extension, there is a set of requirements that SHALL be met
   * as part of the definition of the extension.
   */
  extension?: Extension[];

  /**
   * May be used to represent additional information that is not part of
   * the basic definition of the element and that modifies the
   * understanding of the element in which it is contained and/or the
   * understanding of the containing element's descendants. Usually
   * modifier elements provide negation or qualification. To make the use
   * of extensions safe and manageable, there is a strict set of governance
   * applied to the definition and use of extensions. Though any
   * implementer can define an extension, there is a set of requirements
   * that SHALL be met as part of the definition of the extension.
   * Applications processing a resource are required to check for modifier
   * extensions.
   *
   * Modifier extensions SHALL NOT change the meaning of any elements on
   * Resource or DomainResource (including cannot change the meaning of
   * modifierExtension itself).
   */
  modifierExtension?: Extension[];

  /**
   * Indicates a purpose for which the contact can be reached.
   */
  purpose?: CodeableConcept;

  /**
   * A name associated with the contact.
   */
  name?: HumanName;

  /**
   * A contact detail (e.g. a telephone number or an email address) by
   * which the party may be contacted.
   */
  telecom?: ContactPoint[];

  /**
   * Visiting or postal addresses for the contact.
   */
  address?: Address;
}
