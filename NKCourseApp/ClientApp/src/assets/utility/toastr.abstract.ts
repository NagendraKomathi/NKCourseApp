export abstract class BaseToastr {
  /**
   * A string to track the app language
   */
  language: string;
  /**
   * A string for the toastr title in english
   */
  titleEn: string;
  /**
   * A string for the toastr title in arabic
   */

  titleAr: string;
  /**
   * A string that would be concatented with the default messages
   * `${msg} ${defaultMessage}` = "Employee x has been added successfully"
   */
  msgEn: string;
  msgAr: string;

  constructor(
    titleEn: string,
    titleAr: string,
    language: string,
    msgEn: string,
    msgAr: string
  ) {
    this.titleEn = titleEn;
    this.titleAr = titleAr;
    this.language = language;
    this.msgEn = msgEn;
    this.msgAr = msgAr;
  }
  abstract getTitle(): string;
  abstract getMsg(): string;
}

enum Messages {
  addedEnMsg = 'has been successfully added',
  addedArMsg = 'تم إضافته بنجاح',
  editedEnMsg = 'has been successfully edited',
  editedArMsg = 'تم تعديله بنجاح',
  deletedEnMsg = 'has been successfully deleted',
  deletedArMsg = 'تم حذفه بنجاح'
}

// Edit Toastr Class
export class EditToastr extends BaseToastr {
  constructor(
    titleEn: string,
    titleAr: string,
    language: string,
    msgEn: string,
    msgAr: string
  ) {
    super(titleEn, titleAr, language, msgEn, msgAr);
  }

  getTitle(): string {
    const title = this.language === 'en' ? this.titleEn : this.titleAr;
    return title;
  }

  getMsg(): string {
    const defaultMessage =
      this.language === 'en' ? Messages.editedEnMsg : Messages.editedArMsg;
    const msg = this.language === 'en' ? this.msgEn : this.msgAr;
    return `${msg} ${defaultMessage}`;
  }
}

// Add Toastr Class
export class AddToastr extends BaseToastr {
  constructor(
    titleEn: string,
    titleAr: string,
    language: string,
    msgEn: string,
    msgAr: string
  ) {
    super(titleEn, titleAr, language, msgEn, msgAr);
  }

  getTitle(): string {
    const title = this.language === 'en' ? this.titleEn : this.titleAr;
    return title;
  }
  getMsg(): string {
    const defaultMessage =
      this.language === 'en' ? Messages.addedEnMsg : Messages.addedArMsg;
    const msg = this.language === 'en' ? this.msgEn : this.msgAr;
    return `${msg} ${defaultMessage}`;
  }
}

// Delete Toastr class
export class DeleteToastr extends BaseToastr {
  constructor(
    titleEn: string,
    titleAr: string,
    language: string,
    msgEn: string,
    msgAr: string
  ) {
    super(titleEn, titleAr, language, msgEn, msgAr);
  }

  getTitle(): string {
    const title = this.language === 'en' ? this.titleEn : this.titleAr;
    return title;
  }

  getMsg(): string {
    const defaultMessage =
      this.language === 'en' ? Messages.deletedEnMsg : Messages.deletedArMsg;
    const msg = this.language === 'en' ? this.msgEn : this.msgAr;
    return `${msg} ${defaultMessage}`;
  }

}
