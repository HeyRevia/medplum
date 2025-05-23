/*
 * This is a generated file
 * Do not edit manually.
 */

import { CodeableConcept } from './CodeableConcept';
import { Coverage } from './Coverage';
import { CoverageEligibilityRequest } from './CoverageEligibilityRequest';
import { Extension } from './Extension';
import { Identifier } from './Identifier';
import { Meta } from './Meta';
import { Money } from './Money';
import { Narrative } from './Narrative';
import { Organization } from './Organization';
import { Patient } from './Patient';
import { Period } from './Period';
import { Practitioner } from './Practitioner';
import { PractitionerRole } from './PractitionerRole';
import { Reference } from './Reference';
import { Resource } from './Resource';

/**
 * This resource provides eligibility and plan details from the
 * processing of an CoverageEligibilityRequest resource.
 */
export interface CoverageEligibilityResponse {

  /**
   * This is a CoverageEligibilityResponse resource
   */
  readonly resourceType: 'CoverageEligibilityResponse';

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
   * A unique identifier assigned to this coverage eligiblity request.
   */
  identifier?: Identifier[];

  /**
   * The status of the resource instance.
   */
  status: 'active' | 'cancelled' | 'draft' | 'entered-in-error';

  /**
   * Code to specify whether requesting: prior authorization requirements
   * for some service categories or billing codes; benefits for coverages
   * specified or discovered; discovery and return of coverages for the
   * patient; and/or validation that the specified coverage is in-force at
   * the date/period specified or 'now' if not specified.
   */
  purpose: ('auth-requirements' | 'benefits' | 'discovery' | 'validation')[];

  /**
   * The party who is the beneficiary of the supplied coverage and for whom
   * eligibility is sought.
   */
  patient: Reference<Patient>;

  /**
   * The date or dates when the enclosed suite of services were performed
   * or completed.
   */
  servicedDate?: string;

  /**
   * The date or dates when the enclosed suite of services were performed
   * or completed.
   */
  servicedPeriod?: Period;

  /**
   * The date this resource was created.
   */
  created: string;

  /**
   * The provider which is responsible for the request.
   */
  requestor?: Reference<Practitioner | PractitionerRole | Organization>;

  /**
   * Reference to the original request resource.
   */
  request: Reference<CoverageEligibilityRequest>;

  /**
   * The outcome of the request processing.
   */
  outcome: 'queued' | 'complete' | 'error' | 'partial';

  /**
   * A human readable description of the status of the adjudication.
   */
  disposition?: string;

  /**
   * The Insurer who issued the coverage in question and is the author of
   * the response.
   */
  insurer: Reference<Organization>;

  /**
   * Financial instruments for reimbursement for the health care products
   * and services.
   */
  insurance?: CoverageEligibilityResponseInsurance[];

  /**
   * A reference from the Insurer to which these services pertain to be
   * used on further communication and as proof that the request occurred.
   */
  preAuthRef?: string;

  /**
   * A code for the form to be used for printing the content.
   */
  form?: CodeableConcept;

  /**
   * Errors encountered during the processing of the request.
   */
  error?: CoverageEligibilityResponseError[];
}

/**
 * The date or dates when the enclosed suite of services were performed
 * or completed.
 */
export type CoverageEligibilityResponseServiced = Period | string;

/**
 * Errors encountered during the processing of the request.
 */
export interface CoverageEligibilityResponseError {

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
   * An error code,from a specified code system, which details why the
   * eligibility check could not be performed.
   */
  code: CodeableConcept;
}

/**
 * Financial instruments for reimbursement for the health care products
 * and services.
 */
export interface CoverageEligibilityResponseInsurance {

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
   * Reference to the insurance card level information contained in the
   * Coverage resource. The coverage issuing insurer will use these details
   * to locate the patient's actual coverage within the insurer's
   * information system.
   */
  coverage: Reference<Coverage>;

  /**
   * Flag indicating if the coverage provided is inforce currently if no
   * service date(s) specified or for the whole duration of the service
   * dates.
   */
  inforce?: boolean;

  /**
   * The term of the benefits documented in this response.
   */
  benefitPeriod?: Period;

  /**
   * Benefits and optionally current balances, and authorization details by
   * category or service.
   */
  item?: CoverageEligibilityResponseInsuranceItem[];
}

/**
 * Benefits and optionally current balances, and authorization details by
 * category or service.
 */
export interface CoverageEligibilityResponseInsuranceItem {

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
   * Code to identify the general type of benefits under which products and
   * services are provided.
   */
  category?: CodeableConcept;

  /**
   * This contains the product, service, drug or other billing code for the
   * item.
   */
  productOrService?: CodeableConcept;

  /**
   * Item typification or modifiers codes to convey additional context for
   * the product or service.
   */
  modifier?: CodeableConcept[];

  /**
   * The practitioner who is eligible for the provision of the product or
   * service.
   */
  provider?: Reference<Practitioner | PractitionerRole>;

  /**
   * True if the indicated class of service is excluded from the plan,
   * missing or False indicates the product or service is included in the
   * coverage.
   */
  excluded?: boolean;

  /**
   * A short name or tag for the benefit.
   */
  name?: string;

  /**
   * A richer description of the benefit or services covered.
   */
  description?: string;

  /**
   * Is a flag to indicate whether the benefits refer to in-network
   * providers or out-of-network providers.
   */
  network?: CodeableConcept;

  /**
   * Indicates if the benefits apply to an individual or to the family.
   */
  unit?: CodeableConcept;

  /**
   * The term or period of the values such as 'maximum lifetime benefit' or
   * 'maximum annual visits'.
   */
  term?: CodeableConcept;

  /**
   * Benefits used to date.
   */
  benefit?: CoverageEligibilityResponseInsuranceItemBenefit[];

  /**
   * A boolean flag indicating whether a preauthorization is required prior
   * to actual service delivery.
   */
  authorizationRequired?: boolean;

  /**
   * Codes or comments regarding information or actions associated with the
   * preauthorization.
   */
  authorizationSupporting?: CodeableConcept[];

  /**
   * A web location for obtaining requirements or descriptive information
   * regarding the preauthorization.
   */
  authorizationUrl?: string;
}

/**
 * Benefits used to date.
 */
export interface CoverageEligibilityResponseInsuranceItemBenefit {

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
   * Classification of benefit being provided.
   */
  type: CodeableConcept;

  /**
   * The quantity of the benefit which is permitted under the coverage.
   */
  allowedUnsignedInt?: number;

  /**
   * The quantity of the benefit which is permitted under the coverage.
   */
  allowedString?: string;

  /**
   * The quantity of the benefit which is permitted under the coverage.
   */
  allowedMoney?: Money;

  /**
   * The quantity of the benefit which have been consumed to date.
   */
  usedUnsignedInt?: number;

  /**
   * The quantity of the benefit which have been consumed to date.
   */
  usedString?: string;

  /**
   * The quantity of the benefit which have been consumed to date.
   */
  usedMoney?: Money;
}

/**
 * The quantity of the benefit which is permitted under the coverage.
 */
export type CoverageEligibilityResponseInsuranceItemBenefitAllowed = Money | number | string;

/**
 * The quantity of the benefit which have been consumed to date.
 */
export type CoverageEligibilityResponseInsuranceItemBenefitUsed = Money | number | string;
